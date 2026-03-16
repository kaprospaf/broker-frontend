import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import "./app.css";
import "./global.css";

export function Layout() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>Broker Marketplace</title>
      </head>

      <body>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">
            <Outlet />
          </main>
        </AuthProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}