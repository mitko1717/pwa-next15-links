import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Hello, Next.js!</h1>
      <Link href={"/"} className="my-20 font-bold text-3xl">
        MAIN PAGE LINK
      </Link>
    </main>
  );
}
