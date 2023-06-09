import "./global.css";
import { TrpcProvider } from "./TrpcProvider";
import { NextAuthProvider } from "./SessionProvider";

export const metadata = {
    title: "Aetheris",
    description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <TrpcProvider>
                    <NextAuthProvider>{children}</NextAuthProvider>
                </TrpcProvider>
            </body>
        </html>
    );
}
