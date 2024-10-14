"use server";

import SessionProviderWrapper from "@/components/shared/sessionProviderWrapper";
import "./styles/globals.css";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ReduxProviderWrapper from "@/components/shared/reduxProviderWrapper";
import { ThemeProvider } from "next-themes";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const session = await getServerSession();

  return (
    <html lang={locale}>
      <body>
        <SessionProviderWrapper session={session}>
          <NextIntlClientProvider messages={messages}>
            <ReduxProviderWrapper>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </ReduxProviderWrapper>
          </NextIntlClientProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
