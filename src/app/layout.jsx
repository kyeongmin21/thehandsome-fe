import "../styles/globals.scss"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RootProviders from "@/app/provider/RootProvider";
import ProgressBar from "@/components/common/ProgressBar";
import AuthStatus from "@/components/AuthStatus";

export default async function RootLayout({children}) {

    return (
        <html lang="en">
        <body>
        <div className="flex flex-col min-h-screen">
            <RootProviders>
                <ProgressBar/>
                <AuthStatus />
                <Header/>
                <div className='main-children flex-1'>{children}</div>
                <div className='h-[0px]'><Footer/></div>
            </RootProviders>
        </div>
        </body>
        </html>
    );
}
