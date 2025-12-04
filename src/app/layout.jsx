"use client";
import "../styles/globals.scss"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/app/providers"

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <div className="flex flex-col min-h-screen">
            <Providers>
                <Header/>
                <div className='main-children flex-1'>{children}</div>
                <div className='h-[0px]'><Footer/></div>
            </Providers>
        </div>
        </body>
        </html>
    );
}
