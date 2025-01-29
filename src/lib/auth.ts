import { JWT } from "next-auth/jwt";
import { signOut } from "next-auth/react";

export async function doFinalSignoutHandshake(jwt: JWT) {
  try {
    const { id_token } = jwt;
    const params = new URLSearchParams();
    params.append("client_id", `${process.env.KEYCLOAK_CLIENT_ID}`);
    params.append("id_token_hint", `${id_token}`);
    const url = `${process.env.END_SESSION_URL}?${params.toString()}`;
    await fetch(url);
  } catch (e) {
    console.log(e);
  }
}

export async function refreshAccessToken(token: JWT, isInterceptor?: boolean) {
  try {
    const params = new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID || "",
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET || "",
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
