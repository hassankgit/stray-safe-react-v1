"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRedirectIfAuthenticated(redirectTo: string = "/home") {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push(redirectTo); // redirect to home or another private route
    }
  }, []);
}
