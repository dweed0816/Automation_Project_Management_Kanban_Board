"use client";

import Image from "next/image";

interface BannerProps {
  username: string;
  role: string;
}

export default function Banner({ username, role }: BannerProps) {
  return (
    <header
      className="w-full flex items-center justify-between px-6 py-3 border-b-4"
      style={{ borderColor: "var(--accent-yellow)", backgroundColor: "#ffffff" }}
    >
      <div className="flex items-center gap-4">
        <Image
          src="/Ascential_Logo.webp"
          alt="Ascential Logo"
          width={160}
          height={50}
          style={{ objectFit: "contain" }}
          priority
        />
        <h1
          className="text-xl font-bold"
          style={{ color: "var(--purple)" }}
        >
          Ascential: Automation Project Management Kanban Board
        </h1>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-sm" style={{ color: "var(--orange)" }}>
          {username}
        </span>
        <span className="text-sm" style={{ color: "var(--gray-text)" }}>
          {role}
        </span>
      </div>
    </header>
  );
}
