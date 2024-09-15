
import { AppWrapper } from "../front-extras/helpers/Context";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.scss";

export const metadata = {
  title: "HistorIA",
  description: "Histories that creates a soul",
  icons: "/logo.ico",
  manifest: "/manifest.json", //PWA
};

export default function RootLayout({ children }) {
  return (
  <html lang="en">
    <UserProvider>
    <AppWrapper>
      
      <body className="container">
        {children}

      </body>
    
    </AppWrapper>
    </UserProvider>
  </html>
  );
}
