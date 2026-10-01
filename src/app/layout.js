import Providers from "./Providers";
import Sidebar from "@/components/common/Sidebar";
import '@/styles/global.css'

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
           <div className="app-container">
            <Sidebar />
            <main className="main-content">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
