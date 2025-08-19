import "../styles/globals.scss"
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <div id="modal-root" />
        <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_JS_KEY}&libraries=services&autoload=false`}
            strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
