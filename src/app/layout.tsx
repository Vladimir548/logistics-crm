import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.scss";
import {ProviderNextUI} from "@/providers/ProviderNextUI";
import ProviderQuery from "@/providers/ProviderQuery";
import {Toaster} from "react-hot-toast";
import ProviderSocketStatus from "@/providers/ProviderSocketStatus";


const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '700'],
    preload: false
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
                <Toaster position={'bottom-right'}/>
                <ProviderSocketStatus>
                    <main className={'h-full'}>
                        {children}
                    </main>
                </ProviderSocketStatus>
            </ProviderQuery>
        </ProviderNextUI>
        </body>
        </html>
    );
}
