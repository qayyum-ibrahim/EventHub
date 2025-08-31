import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { EventCard } from "@/components/event/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Calendar,
  Filter,
  SlidersHorizontal,
  RefreshCw,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { useEvents } from "@/hooks/useMockEvents";
import LoadingScreen from "@/components/ui/loadingScreen";
import { toast } from "sonner";

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const {
    data,
    isFetching,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useEvents();
  const allEvents = data?.pages.flatMap((page) => page.events) ?? [];
  const [sortBy, setSortBy] = useState("date");
  const location = useLocation();

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "music", label: "Music" },
    { value: "entertainment", label: "Entertainment" },
    { value: "religious", label: "Religious" },
    { value: "sports", label: "Sports" },
    { value: "gaming", label: "Gaming" },
    { value: "academic", label: "Academic" },
    { value: "social", label: "Social" },
    { value: "arts", label: "Arts" },
    { value: "other", label: "Other" },
  ];

  const sortOptions = [
    { value: "date", label: "Date" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popularity", label: "Most Popular" },
  ];

  const filteredEvents = allEvents
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popularity":
          return b.soldTickets - a.soldTickets;
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });
  const handleRefresh = async () => {
    if ((await refetch()).isSuccess) {
      toast.success("Events information has been updated.");
    } else {
      toast.error("Events failed to update.");
    }
  };
  if (isFetching) {
    return <LoadingScreen />;
  }
  return (
    <div className="min-h-screen bg-background">
      {!location.pathname.includes("/dashboard") && <Navigation />}
      {/* Header */}
      <section className="bg-gradient-to-r from-primary/5 via-primary-light/20 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Discover <span className="text-gradient">Amazing Events</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect events for you from different exciting
              opportunities
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search events, locations, or organizers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="sm:w-48 h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="sm:w-48 h-12">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>
      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold">
                {filteredEvents?.length} Events Found
              </h2>
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="capitalize">
                  {selectedCategory}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={isFetching}
                className="h-8 w-8"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>

          {filteredEvents?.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents?.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or browse all events
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
          {hasNextPage && (
            <div className="text-center mt-8">
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="px-6 py-3"
              >
                {isFetchingNextPage ? "Loading more..." : "Load More"}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
