import "../styles/globals.scss"
import type {PropsWithChildren} from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RootProviders from "@/app/provider/RootProvider";
import ProgressBar from "@/components/common/ProgressBar";
import AuthStatus from "@/components/AuthStatus";


export const metadata = {
    title: {
        default: "더한섬닷컴",
        template: "", // 하위 페이지 제목이 있을 때 연결 방식
    },
    description: "사이드 프로젝트",
    icons: {
        icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧸</text></svg>",
    },
};

export default async function RootLayout({children}: PropsWithChildren) {

    return (
        <html lang="ko">
        <body>
        <div className="flex flex-col min-h-screen">
            <RootProviders>
                <ProgressBar/>
                <AuthStatus />
                <Header/>
                <main className='main-children flex-1'>{children}</main>
            </RootProviders>
            <div className='h-[0px]'><Footer/></div>
        </div>
        </body>
        </html>
    );
}
