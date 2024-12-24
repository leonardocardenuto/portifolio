"use client";

import { FollowerPointerCard } from "@/components/ui/following-pointer";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="A simple portfolio built with Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <FollowerPointerCard className="follower-card">
          {children}
        </FollowerPointerCard>
      </body>
    </html>
  );
}