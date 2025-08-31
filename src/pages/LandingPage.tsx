import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventCard } from "@/components/event/EventCard";
import { Navigation } from "@/components/Navigation";
import {
  Search,
  Calendar,
  Users,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useEvents } from "@/hooks/useMockEvents";

const LandingPage = () => {
  const { data } = useEvents();
  const allEvents = data?.pages.flatMap((page) => page.events) ?? [];
  const featuredEvents = allEvents?.slice(0, 3);
  const upcomingEvents = allEvents?.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative overflow-hidden hero-bg">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary-glow/10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-primary-light text-primary border-primary/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Events Made Easy
              </Badge>

              <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-balance">
                Discover Amazing{" "}
                <span className="text-gradient">Events</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 text-balance max-w-lg">
                Join thousands of students creating unforgettable memories.
                Find, book, and attend the best events on campus with Univibe.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button variant="hero" size="hero" asChild className="group">
                  <Link to="/events">
                    Browse Events
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                {/* Only show Create Account for non-logged in users */}
                <Button variant="outline" size="hero" asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    500+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Events Created
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    10K+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Tickets Sold
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    50+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Universities
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-up lg:justify-self-end">
              <div className="relative">
                <img
                  src={heroImage}
                  alt="students at events"
                  className="rounded-3xl shadow-2xl w-full max-w-lg mx-auto lg:mx-0"
                />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-purple animate-bounce-soft">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Next Event</div>
                      <div className="text-xs text-muted-foreground">
                        Tech Fest 2025
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-purple">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">324 Sold</div>
                      <div className="text-xs text-muted-foreground">
                        This Week
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-gradient-to-b from-background to-purple-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary-light text-primary border-primary/20">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending Now
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Featured Events</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Don't miss exciting events happening soon
            </p>
          </div>
          {featuredEvents?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredEvents?.map((event) => (
                <EventCard key={event._id} event={event} variant="featured" />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
            </div>
          )}

          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/events">
                View All Events
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Univibe</span>
              </div>
              <p className="text-gray-400 mb-4">
                Making events accessible and enjoyable for everyone.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/events"
                    className="hover:text-white transition-colors"
                  >
                    Browse Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/my-tickets"
                    className="hover:text-white transition-colors"
                  >
                    My Tickets
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">For Organizers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/create-event"
                    className="hover:text-white transition-colors"
                  >
                    Create Event
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition-colors"
                  >
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-and-conditions"
                    className="hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Univibe. All rights reserved. Making life
              more vibrant.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
