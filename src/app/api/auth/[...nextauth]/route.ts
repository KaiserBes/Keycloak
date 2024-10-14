import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";
import { signOut } from "next-auth/react";

export async function refreshAccessToken(token: JWT) {
  try {
    const params = new URLSearchParams({
      client_id: process.env.APP_CLIENT_ID || "",
      client_secret: process.env.APP_CLIENT_SECRET || "",
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    });

    const response = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok || response.status === 400) {
      console.error("Failed to refresh token:", refreshedTokens);
      throw new Error(refreshedTokens);
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      expires_at: Date.now() + refreshedTokens.expires_in * 1000,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID || "",
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
      issuer: process.env.KEYCLOAK_ISSUER,
      authorization: {
        params: {
          prompt: "login",
          refresh_session_interval: "1",
        },
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      const expiresIn = 10 * 10;
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.expires_at = Date.now() + expiresIn * 1000;
        return token;
      }

      if (Date.now() < token.expires_at) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      return session;
    },
  },

  events: {
    async signOut({ token }) {
      try {
        await fetch(`${process.env.KEYCLOAK_LOGOUT_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: process.env.KEYCLOAK_CLIENT_ID || "",
            client_secret: process.env.KEYCLOAK_CLIENT_SECRET || "",
            refresh_token: token.refresh_token,
          }),
        });
      } catch (error) {
        console.error("Error during Keycloak logout:", error);
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
