"use server";

import SessionProviderWrapper from "@/components/shared/sessionProviderWrapper";
import "./styles/globals.css";
import { getServerSession } from "next-auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import ReduxProviderWrapper from "@/components/shared/reduxProviderWrapper";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/shared/header";
import { Sidebar } from "@/components/shared/sidebar";
import { Toaster } from "react-hot-toast";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <Providers>
          <Toaster position="top-center" reverseOrder={false} />
          <Header />
          <div className="flex">
            <Sidebar />
            <div className="w-full">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages();
  const session = await getServerSession();

  return (
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
  );
};
