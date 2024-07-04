import type { Metadata } from "next";
import {Inter, Roboto} from "next/font/google";
import "./globals.scss";
import {ProviderNextUI} from "@/providers/ProviderNextUI";
import ProviderQuery from "@/providers/ProviderQuery";
import {Toaster} from "react-hot-toast";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  preload:false
});

export const metadata: Metadata = {
  title: "Транс-Регион",
  description: "Логистическая компания",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className='dark'>
      <body className={roboto.className}>
    <ProviderNextUI>
      <ProviderQuery>
        <Toaster position={'top-center'} />
      <main>
      {children}
      </main>
      </ProviderQuery>
      </ProviderNextUI>
      </body>
    </html>
  );
}
