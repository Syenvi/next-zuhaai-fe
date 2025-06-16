import type { Metadata } from "next";
import "./globals.css";
import { METADATA } from "@/common/constants/metadata";
import NextTopLoader from "nextjs-toploader";
import Layouts from "@/common/components/layouts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { nunitoSans } from "@/common/styles/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.DOMAIN || ""
  ),
  description: METADATA.description,
  keywords: METADATA.keyword,
  creator: METADATA.creator,
  authors: {
    name: METADATA.creator,
    url: METADATA.openGraph.url,
  },
  openGraph: {
    // images: METADATA.profile,
    url: METADATA.openGraph.url,
    siteName: METADATA.openGraph.siteName,
    locale: METADATA.openGraph.locale,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className} antialiased`}>
        <NextTopLoader
          color="#05b6d3"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #05b6d3,0 0 5px #45c6c0"
        />
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#615fff",
                fontFamily: "Nunito, sans-serif",
              },
            }}
          >
            <Layouts>{children}</Layouts>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
