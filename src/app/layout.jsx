import "../styles/globals.scss"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/app/providers";
import ProgressBar from "@/components/common/ProgressBar";
import {serverSession} from '@/utils/getServerSession';
import {serverBrandLike} from "@/utils/getServerBrandLike";


export default async function RootLayout({children}) {
    const session = await serverSession();
    const brandLike = await serverBrandLike()

    return (
        <html lang="en">
        <body>
        <div className="flex flex-col min-h-screen">
            <Providers>
                <ProgressBar/>
                <Header initSession={session} initBrandLike={brandLike}/>
                <div className='main-children flex-1'>{children}</div>
                <div className='h-[0px]'><Footer/></div>
            </Providers>
        </div>
        </body>
        </html>
    );
}
