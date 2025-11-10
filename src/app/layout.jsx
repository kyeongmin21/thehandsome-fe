import "../styles/globals.scss"
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({children}) {
    return (
        <html lang="en">
            <body>
                <Header/>
                <div className='main-children'>{children}</div>
                <Footer/>
            </body>
        </html>
    );
}
