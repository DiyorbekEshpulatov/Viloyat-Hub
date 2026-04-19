"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  MapPin,
  DollarSign,
  Star,
  Grid,
  List,
  Plus,
} from "lucide-react";

const MARKETPLACE_ITEMS = [
  {
    id: 1,
    title: "Premium Uzbek Cotton Fabric",
    seller: "Textile Trade Ltd",
    price: 85000,
    region: "Tashkent",
    category: "Raw Materials",
    rating: 4.8,
    reviews: 23,
    image: "bg-blue-500",
  },
  {
    id: 2,
    title: "Fresh Organic Vegetables",
    seller: "Samarkand Farm Cooperative",
    price: 15000,
    region: "Samarkand",
    category: "Products",
    rating: 4.9,
    reviews: 45,
    image: "bg-green-500",
  },
  {
    id: 3,
    title: "Professional Consulting Services",
    seller: "Business Growth Partners",
    price: 500000,
    region: "Bukhara",
    category: "Services",
    rating: 4.7,
    reviews: 12,
    image: "bg-purple-500",
  },
  {
    id: 4,
    title: "Mining Equipment",
    seller: "Industrial Solutions",
    price: 2500000,
    region: "Navoi",
    category: "Equipment",
    rating: 4.6,
    reviews: 8,
    image: "bg-gray-500",
  },
  {
    id: 5,
    title: "Ceramic Tiles Manufacturing",
    seller: "Ceramic Exports Co",
    price: 350000,
    region: "Fergana",
    category: "Products",
    rating: 4.8,
    reviews: 34,
    image: "bg-orange-500",
  },
  {
    id: 6,
    title: "Export Documentation Services",
    seller: "Trade Logistics Hub",
    price: 250000,
    region: "Tashkent",
    category: "Services",
    rating: 4.9,
    reviews: 28,
    image: "bg-indigo-500",
  },
];

export default function MarketplacePage() {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Products", "Services", "Raw Materials", "Equipment"];

  const filteredItems = MARKETPLACE_ITEMS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {t("marketplace.title")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("marketplace.description")}
            </p>
          </div>
          <Link
            href="/marketplace/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={20} />
            {t("marketplace.newListing")}
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="bg-card rounded-lg border border-border p-6 mb-8">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search products, services, sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewType("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewType === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewType("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewType === "list"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Items Display */}
        {filteredItems.length > 0 ? (
          <div
            className={
              viewType === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={`/marketplace/${item.id}`}
                className={`group bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-all hover:shadow-lg ${
                  viewType === "list" ? "flex gap-4 p-4" : "flex flex-col"
                }`}
              >
                {/* Image */}
                <div
                  className={`${item.image} flex-shrink-0 ${
                    viewType === "list" ? "w-32 h-32 rounded" : "h-48 w-full"
                  }`}
                />

                {/* Content */}
                <div className={`${viewType === "list" ? "flex-grow" : "flex-1 p-4"}`}>
                  <div className={viewType === "list" ? "p-4" : ""}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded whitespace-nowrap flex-shrink-0">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                      {item.seller}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      <Star className="text-amber-500 fill-amber-500" size={16} />
                      <span className="text-sm font-semibold text-foreground">
                        {item.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({item.reviews} reviews)
                      </span>
                    </div>

                    {/* Location and Price */}
                    <div
                      className={`flex items-center gap-4 ${
                        viewType === "list" ? "pt-4 border-t border-border" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin size={16} />
                        <span className="text-sm">{item.region}</span>
                      </div>
                      <div className="ml-auto">
                        <p className="text-xl font-bold text-primary">
                          {item.price.toLocaleString()} UZS
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No items found
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
