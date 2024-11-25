"use client";

import { Button } from "antd";
import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

const Login: NextPage = () => {
  const t = useTranslations("login");
  const { data: session } = useSession();

  const locale = useLocale();

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="w-full h-[calc(100vh_-_113px)] flex items-center justify-center">
      {!session ? (
        <>
          <Button
            onClick={() =>
              signIn("keycloak", {
                callbackUrl: `/${locale}/dashboard`,
              })
            }
            type="primary"
          >
            {t("login-button")}
          </Button>
        </>
      ) : (
        <>
          <Button type="primary" onClick={handleSignOut}>
            {t("logout-button")}
          </Button>
        </>
      )}
    </div>
  );
};

export default Login;
