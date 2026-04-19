"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, AuthToken } from "@/types";
import api, { setAuthToken, removeAuthToken, getAuthToken } from "@/utils/api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const response = await api.get<User>("/auth/me");
          setUser(response as User);
        } catch (err) {
          removeAuthToken();
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.post<AuthToken>("/auth/login", {
          email,
          password,
        });
        const { accessToken, user: userData } = response as AuthToken;
        setAuthToken(accessToken);
        setUser(userData);
        router.push("/dashboard");
        return userData;
      } catch (err: any) {
        const message = err.response?.data?.error || "Login failed";
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const signup = useCallback(
    async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      businessName?: string;
      role: "entrepreneur" | "mentor";
    }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.post<AuthToken>("/auth/signup", data);
        const { accessToken, user: userData } = response as AuthToken;
        setAuthToken(accessToken);
        setUser(userData);
        router.push("/dashboard");
        return userData;
      } catch (err: any) {
        const message = err.response?.data?.error || "Signup failed";
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout", {});
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      removeAuthToken();
      setUser(null);
      router.push("/");
    }
  }, [router]);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };
}
