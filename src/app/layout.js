import { Inter } from "next/font/google";
import "./globals.css";
import 'alertifyjs/build/css/alertify.css';
import 'alertifyjs/build/css/themes/default.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: 'Đăng nhập - MXH',
	description: 'Test API',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " bg-white"}>
        {children}
      </body>
    </html>
  );
}
