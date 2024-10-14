"use client";

import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const Login: NextPage = () => {
  const t = useTranslations("login");
  const { data: session } = useSession();
  const router = useRouter();
  const locale = useLocale();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  return (
    <div className="w-full h-[calc(100vh_-_113px)] flex items-center justify-center">
      {!session ? (
        <>
          <Button
            onClick={() =>
              signIn("keycloak", {
                callbackUrl: `/${locale}/dashboard`,
                prompt: "login",
              })
            }
          >
            {t("login-button")}
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleSignOut}>{t("logout-button")}</Button>
        </>
      )}
    </div>
  );
};

export default Login;
