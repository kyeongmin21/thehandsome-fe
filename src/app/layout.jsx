import "../styles/globals.scss"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <div id="modal-root" />
      </body>
    </html>
  );
}
