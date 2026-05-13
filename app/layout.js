import { Bangers, Nunito } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { ButtonsProvider } from "./components/ButtonsProvider";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/Header";

const bangersFont = Bangers({
  weight: "400",
  variable: "--font-bangers",
  subsets: ["latin"],
});

const nunitoFont = Nunito({
  // weight: '400',
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata = {
  title: "Library Button Exchange",
  description: "Summer Reading 2026 Michigan Library Button Exchange",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bangersFont.variable} ${nunitoFont.variable}`}
    >
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Button Exchange" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <ButtonsProvider>
          <Header />
          {children}
          <Footer />
        </ButtonsProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
