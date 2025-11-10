import "../styles/globals.scss"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SessionProviders from "./providers"


export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
            <SessionProviders>
                <Header/>
                <div className='main-children'>{children}</div>
                <Footer/>
            </SessionProviders>
        </body>
        </html>
    );
}
