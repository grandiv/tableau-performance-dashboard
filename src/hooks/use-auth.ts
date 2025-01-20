// src/hooks/use-auth.ts
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Check if authentication is still loading
    if (status === "loading") return;

    // If no session exists, redirect to login
    if (!session) {
      router.replace("/login");
    }
<<<<<<< HEAD

=======
>>>>>>> 49a8a8b1062bf70743738d8f60c0fce50b7ebca6
    if (session) {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  return { session, status };
}
