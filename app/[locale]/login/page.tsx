"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Mail, Lock, AlertCircle, Loader } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const t = useTranslations();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.email || !formData.password) {
      setFormError("Please fill in all fields");
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch (err: any) {
      setFormError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border border-border p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("nav.login")}
          </h1>
          <p className="text-muted-foreground mb-8">
            Welcome back to Viloyat-Hub
          </p>

          {(formError || error) && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/50 rounded-lg flex gap-3">
              <AlertCircle className="text-destructive flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-semibold text-destructive">
                  {t("common.error")}
                </p>
                <p className="text-sm text-destructive/90">{formError || error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t("auth.email")}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t("auth.password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader size={20} className="animate-spin" />}
              {t("nav.login")}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {t("nav.signup")}{" "}
              <Link href="/signup" className="text-primary hover:underline font-semibold">
                {t("nav.signup")}
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
