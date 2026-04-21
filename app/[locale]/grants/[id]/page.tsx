"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Bookmark,
  Share2,
} from "lucide-react";

// Sample grant detail - replace with API call
const SAMPLE_GRANT = {
  id: 1,
  title: "Technology Innovation Fund",
  description:
    "Grant for innovative technology startups with potential for regional impact and job creation.",
  amount: 50000000,
  currency: "UZS",
  category: "Technology",
  region: "Tashkent",
  provider: "Ministry of Digital Economy",
  deadline: "2026-12-31",
  status: "active",
  eligibility: [
    "Registered business in Uzbekistan",
    "Less than 3 years old",
    "In the technology sector",
    "Have a viable business plan",
    "Team with at least 2 members",
  ],
  requirements: [
    "Business registration documents",
    "Business plan (5-10 pages)",
    "Financial projections",
    "Team resume and experience",
    "Letter of intent",
  ],
  benefits: [
    "Direct funding up to 50 million UZS",
    "Business mentorship from experienced entrepreneurs",
    "Access to network of investors",
    "Office space in innovation hub (3 months)",
    "Startup training and workshops",
  ],
  applicationSteps: [
    "Complete online application form",
    "Submit required documents",
    "Initial screening (2 weeks)",
    "Interview with committee (1 week)",
    "Final decision (2 weeks)",
  ],
  contactEmail: "apply@digital.uz",
  contactPhone: "+998 71 200 8000",
  websiteUrl: "https://digital.uz/grants",
};

export default function GrantDetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations();
  const [isSaved, setIsSaved] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "UZS",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const daysUntilDeadline = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const days = Math.ceil(
      (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days;
  };

  const days = daysUntilDeadline(SAMPLE_GRANT.deadline);
  const isDeadlineSoon = days <= 7;
  const isDeadlinePassed = days < 0;

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/grants"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft size={20} />
          Back to Grants
        </Link>

        {/* Header Section */}
        <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                {SAMPLE_GRANT.category}
              </span>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {SAMPLE_GRANT.title}
              </h1>
              <p className="text-lg text-muted-foreground">
                {SAMPLE_GRANT.provider}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-3 rounded-lg border transition-colors ${
                  isSaved
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-border text-muted-foreground hover:border-primary"
                }`}
              >
                <Bookmark size={20} />
              </button>
              <button className="p-3 rounded-lg border border-border text-muted-foreground hover:border-primary transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4 border-t border-border pt-6">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <DollarSign size={18} />
                <span className="text-sm font-medium">Grant Amount</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(SAMPLE_GRANT.amount)}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <MapPin size={18} />
                <span className="text-sm font-medium">Region</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {SAMPLE_GRANT.region}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar size={18} />
                <span className="text-sm font-medium">Deadline</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {new Date(SAMPLE_GRANT.deadline).toLocaleDateString()}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <AlertCircle size={18} />
                <span className="text-sm font-medium">Days Left</span>
              </div>
              <p
                className={`text-2xl font-bold ${
                  isDeadlinePassed
                    ? "text-destructive"
                    : isDeadlineSoon
                      ? "text-amber-600"
                      : "text-emerald-600"
                }`}
              >
                {isDeadlinePassed ? "Passed" : `${days} days`}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <section className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                About This Grant
              </h2>
              <p className="text-foreground leading-relaxed">
                {SAMPLE_GRANT.description}
              </p>
            </section>

            {/* Eligibility */}
            <section className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="text-primary" size={24} />
                Eligibility Criteria
              </h2>
              <ul className="space-y-3">
                {SAMPLE_GRANT.eligibility.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-foreground">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="text-primary" size={24} />
                Required Documents
              </h2>
              <ul className="space-y-2">
                {SAMPLE_GRANT.requirements.map((item, idx) => (
                  <li key={idx} className="flex gap-2 text-foreground">
                    <span className="text-primary font-bold">{idx + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Benefits */}
            <section className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                What You&apos;ll Get
              </h2>
              <ul className="space-y-3">
                {SAMPLE_GRANT.benefits.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-foreground">
                    <CheckCircle className="text-emerald-600 flex-shrink-0 mt-1" size={20} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Application Steps */}
            <section className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Application Process
              </h2>
              <div className="space-y-4">
                {SAMPLE_GRANT.applicationSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div className="pt-1">
                      <p className="font-semibold text-foreground">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Apply Button */}
            {!isDeadlinePassed && (
              <button
                onClick={() => setShowApplyForm(!showApplyForm)}
                className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:opacity-90 transition-opacity text-lg"
              >
                {t("grants.apply")}
              </button>
            )}

            {/* Contact Info */}
            <section className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-bold text-foreground mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <a
                    href={`mailto:${SAMPLE_GRANT.contactEmail}`}
                    className="text-primary hover:underline font-semibold"
                  >
                    {SAMPLE_GRANT.contactEmail}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <a
                    href={`tel:${SAMPLE_GRANT.contactPhone}`}
                    className="text-primary hover:underline font-semibold"
                  >
                    {SAMPLE_GRANT.contactPhone}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Website</p>
                  <a
                    href={SAMPLE_GRANT.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-semibold break-all"
                  >
                    {SAMPLE_GRANT.websiteUrl}
                  </a>
                </div>
              </div>
            </section>

            {/* Status Badge */}
            {isDeadlinePassed && (
              <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-4">
                <p className="text-destructive font-semibold">
                  Application period has ended
                </p>
              </div>
            )}

            {isDeadlineSoon && (
              <div className="bg-amber-500/10 border border-amber-500/50 rounded-lg p-4">
                <p className="text-amber-700 font-semibold">
                  Deadline is coming soon! Only {days} days left to apply.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
