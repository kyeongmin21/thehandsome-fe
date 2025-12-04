import "../styles/globals.scss"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/app/providers";
import {serverSession} from '@/utils/getServerSession';
import ProgressBar from "@/components/common/ProgressBar";


export default async function RootLayout({children}) {
    const session = await serverSession();

    return (
        <html lang="en">
        <body>
        <div className="flex flex-col min-h-screen">
            <Providers>
                <ProgressBar/>
                <Header initialSession={session}/>
                <div className='main-children flex-1'>{children}</div>
                <div className='h-[0px]'><Footer/></div>
            </Providers>
        </div>
        </body>
        </html>
    );
}
