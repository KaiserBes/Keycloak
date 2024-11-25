import { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { refreshAccessToken, doFinalSignoutHandshake } from "@/lib/auth";

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
