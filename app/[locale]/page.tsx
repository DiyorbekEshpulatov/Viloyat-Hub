"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import {
  Zap,
  Gift,
  Users,
  ShoppingCart,
  Brain,
  ArrowRight,
  CheckCircle,
  X,
  Cpu,
  Smartphone,
  Cloud,
  Zap as Lightning,
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const features = [
    {
      icon: Gift,
      title: t("home.features.grants"),
      desc: t("home.features.grantsDesc"),
      href: "/grants",
      color: "text-blue-500",
    },
    {
      icon: Brain,
      title: t("home.features.mentor"),
      desc: t("home.features.mentorDesc"),
      href: "/mentor",
      color: "text-purple-500",
    },
    {
      icon: ShoppingCart,
      title: t("home.features.marketplace"),
      desc: t("home.features.marketplaceDesc"),
      href: "/marketplace",
      color: "text-amber-500",
    },
    {
      icon: Users,
      title: t("home.features.mentorship"),
      desc: t("home.features.mentorshipDesc"),
      href: "/mentorship",
      color: "text-emerald-500",
    },
  ];

  const benefits = [
    "Access grants tailored to your business",
    "Get guidance from AI and experienced mentors",
    "Connect with suppliers and customers",
    "Join a thriving entrepreneurship community",
  ];

  const nanoTechs = [
    { icon: Cpu, label: "Cloud Computing" },
    { icon: Smartphone, label: "Mobile First" },
    { icon: Brain, label: "AI & ML" },
    { icon: Lightning, label: "IoT Ready" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Robot-Style Header with Modal Trigger */}
      <section className="relative px-4 py-12 bg-gradient-to-b from-primary/10 to-transparent border-b-2 border-primary/20 cursor-pointer hover:from-primary/15 transition-colors" onClick={() => setShowLoginModal(true)}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🤖</div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">VILOYAT-HUB</h2>
              <p className="text-sm text-primary font-semibold uppercase tracking-wider">Uzbekistan Entrepreneurship Platform v1.0</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-primary animate-pulse">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm font-semibold">SYSTEM READY</span>
          </div>
        </div>
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-2xl max-w-md w-full border-2 border-primary/30">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">SYSTEM LOGIN</h3>
              <button onClick={() => setShowLoginModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <input type="email" placeholder={t("auth.email")} className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary" />
              <input type="password" placeholder={t("auth.password")} className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:border-primary" />
              <Link href="/login" className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-center">
                {t("nav.login")}
              </Link>
              <Link href="/signup" className="block w-full px-4 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-center">
                {t("nav.signup")}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t("home.title")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t("home.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {t("home.cta")}
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/grants"
              className="px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {t("nav.grants")}
            </Link>
          </div>
        </div>
      </section>

      {/* Nano Technologies Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-primary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Powered by Nano Technologies</h2>
            <p className="text-muted-foreground">Built on cutting-edge technology stack for maximum performance</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {nanoTechs.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div key={idx} className="group p-6 bg-card rounded-lg border border-primary/20 hover:border-primary hover:shadow-lg transition-all text-center">
                  <Icon className="text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" size={32} />
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{tech.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Entrepreneurship Platform
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to start, grow, and scale your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="group p-6 bg-background rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all"
                >
                  <Icon className={`${feature.color} mb-4`} size={32} />
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {feature.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-semibold">Explore</span>
                    <ArrowRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Why Choose Viloyat-Hub?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 flex flex-col justify-center items-center">
              <Zap className="text-primary mb-4" size={48} />
              <h3 className="text-2xl font-bold text-foreground mb-2 text-center">
                Ready to Start?
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                Join thousands of entrepreneurs building their dreams
              </p>
              <Link
                href="/signup"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-20 bg-secondary text-secondary-foreground">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <p>Grants Available</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <p>Mentors</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <p>Active Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join the Viloyat-Hub community and access resources to grow your entrepreneurship journey
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Sign Up for Free
          </Link>
        </div>
      </section>
    </div>
  );
}
