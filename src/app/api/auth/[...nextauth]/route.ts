import NextAuth, { AuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak";
import { signOut } from "next-auth/react";

async function doFinalSignoutHandshake(jwt: JWT) {
  try {
    const { id_token } = jwt;
    const params = new URLSearchParams();
    params.append("client_id", `${process.env.APP_CLIENT_ID}`);
    params.append("id_token_hint", `${id_token}`);
    const url = `${process.env.END_SESSION_URL}?${params.toString()}`;
    await fetch(url);
  } catch (e: any) {}
}
export async function refreshAccessToken(
  token: JWT | Session,
  isInterceptor?: boolean
) {
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
      throw new Error(refreshedTokens);
    } else {
      const newToken = {
        ...token,
        access_token: refreshedTokens.access_token,
        expires_at: Date.now() + refreshedTokens.expires_in * 1000,
        refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
        refresh_expires_in: refreshedTokens.expires_in,
      };
      return newToken;
    }
  } catch (error) {
    if (isInterceptor) {
      throw new Error((error as Error)?.message);
    } else {
      await signOut();
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID || "",
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  events: {
    async signOut({ token }) {
      await doFinalSignoutHandshake(token);
    },
  },
  callbacks: {
    async jwt({ token, account }) {
      const expiresIn = 10 * 10;
      if (account) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.expires_at = Date.now() + expiresIn * 1000000;
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
