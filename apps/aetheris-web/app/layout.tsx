import "./global.css";
import { TrpcProvider } from "./TrpcProvider";

export const metadata = {
    title: "Aetheris",
    description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <TrpcProvider>{children}</TrpcProvider>
            </body>
        </html>
    );
}
