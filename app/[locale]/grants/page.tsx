"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  ArrowRight,
  Briefcase,
  TrendingUp,
} from "lucide-react";

// Sample grant data - replace with API call
const SAMPLE_GRANTS = [
  {
    id: 1,
    title: "Technology Innovation Fund",
    description: "Grant for innovative technology startups with regional impact",
    amount: 50000000,
    category: "Technology",
    region: "Tashkent",
    deadline: "2026-12-31",
    status: "active",
  },
  {
    id: 2,
    title: "Agricultural Development Grant",
    description: "Support for modern agricultural enterprises",
    amount: 30000000,
    category: "Agriculture",
    region: "Samarkand",
    deadline: "2026-06-30",
    status: "active",
  },
  {
    id: 3,
    title: "SME Growth Program",
    description: "Funding for expanding small and medium enterprises",
    amount: 25000000,
    category: "General",
    region: "Nationwide",
    deadline: "2026-08-15",
    status: "active",
  },
  {
    id: 4,
    title: "Tourism Development Grant",
    description: "Support for tourism-related businesses",
    amount: 20000000,
    category: "Tourism",
    region: "Bukhara",
    deadline: "2026-07-01",
    status: "active",
  },
  {
    id: 5,
    title: "Women Entrepreneurs Fund",
    description: "Special grant program for women-led businesses",
    amount: 15000000,
    category: "General",
    region: "Nationwide",
    deadline: "2026-10-31",
    status: "active",
  },
];

const CATEGORIES = [
  "All Categories",
  "Technology",
  "Agriculture",
  "General",
  "Tourism",
  "Manufacturing",
];

const REGIONS = [
  "All Regions",
  "Tashkent",
  "Samarkand",
  "Bukhara",
  "Khiva",
  "Fergana",
  "Nationwide",
];

export default function GrantsPage() {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [sortBy, setSortBy] = useState("amount");

  const filteredGrants = useMemo(() => {
    let filtered = SAMPLE_GRANTS.filter((grant) => {
      const matchesSearch =
        grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grant.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All Categories" ||
        grant.category === selectedCategory;
      const matchesRegion =
        selectedRegion === "All Regions" || grant.region === selectedRegion;

      return matchesSearch && matchesCategory && matchesRegion;
    });

    // Sort
    if (sortBy === "amount") {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === "deadline") {
      filtered.sort(
        (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedRegion, sortBy]);

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
    return days > 0 ? `${days} days left` : "Deadline passed";
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            {t("grants.title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("grants.description")}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder={t("grants.search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t("grants.filter")}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t("grants.region")}
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {REGIONS.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="amount">Highest Amount</option>
                <option value="deadline">Earliest Deadline</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Found <span className="font-semibold text-foreground">{filteredGrants.length}</span> grants
          </p>
        </div>

        {/* Grants List */}
        {filteredGrants.length > 0 ? (
          <div className="grid gap-6">
            {filteredGrants.map((grant) => (
              <Link
                key={grant.id}
                href={`/grants/${grant.id}`}
                className="group bg-card rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-start gap-3 mb-3">
                        <Briefcase className="text-primary flex-shrink-0 mt-1" size={20} />
                        <div>
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {grant.title}
                          </h3>
                          <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                            {grant.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-muted-foreground line-clamp-2">
                        {grant.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
                        <div>
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <DollarSign size={16} />
                            <span className="text-xs font-medium">{t("grants.amount")}</span>
                          </div>
                          <p className="font-semibold text-foreground">
                            {formatCurrency(grant.amount)}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <MapPin size={16} />
                            <span className="text-xs font-medium">{t("grants.region")}</span>
                          </div>
                          <p className="font-semibold text-foreground">{grant.region}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Calendar size={16} />
                            <span className="text-xs font-medium">{t("grants.deadline")}</span>
                          </div>
                          <p className="font-semibold text-foreground">
                            {new Date(grant.deadline).toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <TrendingUp size={16} />
                            <span className="text-xs font-medium">Time Left</span>
                          </div>
                          <p className="font-semibold text-amber-600">
                            {daysUntilDeadline(grant.deadline)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform">
                      <span className="font-semibold">{t("grants.apply")}</span>
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Briefcase className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No grants found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
