"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Users,
  Star,
  MapPin,
  DollarSign,
  Calendar,
  ArrowRight,
  Plus,
} from "lucide-react";

const MENTORS = [
  {
    id: 1,
    name: "Aziz Karimov",
    title: "Business Strategy Expert",
    expertise: ["Business Strategy", "Marketing", "Sales"],
    rating: 4.8,
    hourlyRate: 50000,
    region: "Tashkent",
    bio: "15+ years of experience building successful businesses",
  },
  {
    id: 2,
    name: "Dilshoda Yusupova",
    title: "Finance & Accounting Specialist",
    expertise: ["Finance", "Accounting", "Risk Management"],
    rating: 4.6,
    hourlyRate: 45000,
    region: "Samarkand",
    bio: "12+ years in financial management and optimization",
  },
];

export default function MentorshipPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {t("mentorship.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("mentorship.description")}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/mentorship/schedule"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <Calendar size={20} />
              {t("mentorship.schedule")}
            </Link>
            <Link
              href="/mentorship/become-mentor"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Plus size={20} />
              {t("mentorship.becomeMentor")}
            </Link>
          </div>
        </div>

        {/* Mentor Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {MENTORS.map((mentor) => (
            <Link
              key={mentor.id}
              href={`/mentorship/${mentor.id}`}
              className="group bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-all hover:shadow-lg"
            >
              <div className="p-6">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4" />

                {/* Info */}
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {mentor.name}
                </h3>
                <p className="text-primary mb-3">{mentor.title}</p>

                {/* Bio */}
                <p className="text-muted-foreground text-sm mb-4">{mentor.bio}</p>

                {/* Expertise */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">
                    Expertise
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="text-amber-500 fill-amber-500" size={16} />
                      <span className="text-sm font-semibold text-foreground">
                        {mentor.rating}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {mentor.region}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Per Hour</p>
                    <p className="font-bold text-primary">
                      {(mentor.hourlyRate / 1000).toFixed(0)}K UZS
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full mt-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group-hover:bg-primary">
                  {t("mentorship.schedule")}
                  <ArrowRight size={16} />
                </button>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {MENTORS.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No mentors available
            </h3>
            <p className="text-muted-foreground mb-6">
              Check back soon for more mentors
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
