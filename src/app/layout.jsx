import "../styles/globals.scss"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RootProviders from "@/app/provider/RootProvider";
import ProgressBar from "@/components/common/ProgressBar";
import AuthStatus from "@/components/AuthStatus";
import {serverSession} from '@/utils/getServerSession';
import {serverBrandLike} from "@/utils/getServerBrandLike";


export default async function RootLayout({children}) {
    const session = await serverSession();
    const brandLike = await serverBrandLike()

    return (
        <html lang="en">
        <body>
        <div className="flex flex-col min-h-screen">
            <RootProviders>
                <ProgressBar/>
                <AuthStatus />
                <Header initSession={session} initBrandLike={brandLike}/>
                <div className='main-children flex-1'>{children}</div>
                <div className='h-[0px]'><Footer/></div>
            </RootProviders>
        </div>
        </body>
        </html>
    );
}
