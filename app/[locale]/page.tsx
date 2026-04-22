"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Zap,
  Gift,
  Users,
  ShoppingCart,
  Brain,
  ArrowRight,
  CheckCircle,
  Cpu,
  Smartphone,
  Cloud,
  Zap as Lightning,
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations();

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
      {/* Robot-Style Header - Links to Login */}
      <Link href="/login">
        <section className="relative px-3 sm:px-4 py-8 sm:py-12 bg-gradient-to-b from-primary/10 to-transparent border-b-2 border-primary/20 cursor-pointer hover:from-primary/15 transition-colors">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="text-2xl sm:text-3xl lg:text-4xl">🤖</div>
                <div>
                  <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-foreground">VILOYAT-HUB</h2>
                  <p className="text-xs sm:text-sm text-primary font-semibold uppercase tracking-wider">Entrepreneurship Platform</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-primary animate-pulse">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-xs sm:text-sm font-semibold">SYSTEM READY</span>
              </div>
            </div>
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
          </div>
        </section>
      </Link>

      {/* Hero Section */}
      <section className="px-3 sm:px-4 py-12 sm:py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            {t("home.title")}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
            {t("home.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0">
            <Link
              href="/signup"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {t("home.cta")}
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="/grants"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors text-sm sm:text-base"
            >
              {t("nav.grants")}
            </Link>
          </div>
        </div>
      </section>

      {/* Nano Technologies Section */}
      <section className="px-3 sm:px-4 py-12 sm:py-20 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-y border-primary/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">Powered by Nano Technologies</h2>
            <p className="text-xs sm:text-sm text-muted-foreground px-2">Built on cutting-edge technology stack</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {nanoTechs.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div key={idx} className="group p-4 sm:p-6 bg-card rounded-lg border border-primary/20 hover:border-primary hover:shadow-lg transition-all text-center">
                  <Icon className="text-primary mb-3 sm:mb-4 mx-auto group-hover:scale-110 transition-transform" size={28} className="sm:w-8 sm:h-8 lg:w-8 lg:h-8" />
                  <p className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{tech.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-3 sm:px-4 py-12 sm:py-20 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4">
              Complete Entrepreneurship Platform
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto px-2">
              Everything you need to start, grow, and scale your business
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="group p-4 sm:p-6 bg-background rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all"
                >
                  <Icon className={`${feature.color} mb-3 sm:mb-4`} size={28} />
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {feature.desc}
                  </p>
                  <div className="mt-3 sm:mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs sm:text-sm font-semibold">Explore</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-3 sm:px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">
                Why Choose Viloyat-Hub?
              </h2>
              <ul className="space-y-3 sm:space-y-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex gap-2 sm:gap-3 items-start">
                    <CheckCircle className="text-primary flex-shrink-0 mt-0.5 sm:mt-1" size={18} className="sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 sm:p-8 flex flex-col justify-center items-center">
              <Zap className="text-primary mb-3 sm:mb-4" size={40} className="sm:w-12 sm:h-12" />
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 text-center">
                Ready to Start?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground text-center mb-4 sm:mb-6">
                Join thousands of entrepreneurs building their dreams
              </p>
              <Link
                href="/signup"
                className="px-5 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-3 sm:px-4 py-12 sm:py-20 bg-secondary text-secondary-foreground">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">5000+</div>
              <p className="text-xs sm:text-sm">Grants Available</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">1000+</div>
              <p className="text-xs sm:text-sm">Mentors</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">10K+</div>
              <p className="text-xs sm:text-sm">Active Users</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-3 sm:px-4 py-12 sm:py-20">
        <div className="max-w-2xl mx-auto text-center px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
            Join the Viloyat-Hub community and access resources to grow your entrepreneurship journey
          </p>
          <Link
            href="/signup"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm sm:text-base"
          >
            Sign Up for Free
          </Link>
        </div>
      </section>
    </div>
  );
}
