import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { Menu } from '../components/shared/Menu';
import { Footer } from "@/components/shared/Footer";
import 'react-toastify/dist/ReactToastify.css';


const monserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manuel Portafolio",
  description: "Mi portafolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${monserrat.className} 

        antialiased bg-gradient-to-b
         from-background-light
         to-background-light-secondary          
         dark:from-background-tertiary 
         dark:to-background-primary  
         dark:text-color-text-secondary
         transition-colors duration-500
         transition-background-color duration-600`}
        
      >
        <Menu />
        <main className="">

          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
