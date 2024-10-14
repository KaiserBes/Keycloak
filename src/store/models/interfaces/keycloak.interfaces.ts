import { ProviderType } from "next-auth/providers/index";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      id: string;
      pin: string;
    };
    error?: string | null;
    access_token: string;
    isAdmin: boolean;
    isManager: boolean;
    isAdminOrManager: boolean;
    refresh_token: string;
    refresh_expires_in: number;
    expires_at: number;
  }

  interface User {
    name: string;
    email: string;
    id: string;
    pin: string;
  }

  interface Account {
    provider: string;
    type: ProviderType;
    id: string;
    access_token: string;
    refresh_token: string;
    idToken: string;
    expires_at: number;
    refresh_expires_in: number;
    token_type: string;
    id_token: string;
    "not-before-policy": number;
    session_state: string;
    scope: string;
  }

  interface Profile {
    sub?: string;
    email_verified: boolean;
    name?: string;
    telephone: string;
    preferred_username: string;
    org_name: string;
    given_name: string;
    family_name: string;
    email?: string;
  }

  interface jwtToken {
    pin: string;
    email: string;
    family_name: string;
    given_name: string;
    middle_name: string;
    realm_access: {
      roles: string[];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    refresh_expires_in: number;
    expires_at: number;
    isAdmin: boolean;
    isManager: boolean;
    isAdminOrManager: boolean;
    user: {
      name: string;
      email: string;
      id: string;
      pin: string;
    };
    error?: string | null;
  }
}
