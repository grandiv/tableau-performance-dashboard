"use client";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";

export default function Page() {
  const { status } = useAuth();

  // Show loading state while checking authentication
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Image src="/rm209-ning-20.jpg" alt="Logo" fill />
      <div className="w-full max-w-sm z-10">
        <LoginForm />
      </div>
    </div>
  );
}
