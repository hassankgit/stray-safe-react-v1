"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useRedirectIfUnauthenticated(
  redirectIfUnauthenticated: boolean = true
) {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && redirectIfUnauthenticated) {
      router.push("/"); // redirect to login
    } else if (token) {
      setAuthorized(true);
    }
  }, [redirectIfUnauthenticated]);

  return authorized;
}
