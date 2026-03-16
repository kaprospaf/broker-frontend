import "../globals.css";
import { AuthProvider } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AuthProvider>
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-100 min-h-screen">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}