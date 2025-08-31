import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import type { Event } from "@/types";
import { categoryColors } from "@/utils/helpers";

interface EventCardProps {
  event: Event;
  variant?: "default" | "featured";
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const availableTickets = event.totalTickets - event.soldTickets;
  const soldPercentage = (event.soldTickets / event.totalTickets) * 100;

  if (variant === "featured") {
    return (
      <Link to={`/events/${event._id}`} className="block group">
        <div className="event-card overflow-hidden bg-white rounded-2xl shadow-card hover:shadow-purple transition-all duration-300">
          <div className="relative overflow-hidden">
            <img
              src={event.image.url}
              alt={event.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <Badge
                className={categoryColors[event.category]}
                variant="secondary"
              >
                {event.category.charAt(0).toUpperCase() +
                  event.category.slice(1)}
              </Badge>
            </div>
            {soldPercentage > 80 && (
              <div className="absolute top-4 right-4">
                <Badge variant="destructive" className="bg-red-500">
                  Almost Sold Out!
                </Badge>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {event.title}
              </h3>
              <div className="text-right ml-4 flex-shrink-0">
                <p className="text-2xl font-bold text-primary">
                  ₦{event.price.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">per ticket</p>
              </div>
            </div>

            <p className="whitespace-pre-wrap text-muted-foreground text-sm mb-4 line-clamp-2">
              {event.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(event.date)} at {formatTime(event.time)}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>{availableTickets} tickets available</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                by {event.organizerName}
              </div>
              <Button variant="ghost-purple" size="sm">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/events/${event._id}`} className="block group">
      <div className="event-card bg-white rounded-xl shadow-card hover:shadow-purple transition-all duration-300 overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            src={event.image.url}
            alt={event.title}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <Badge
              className={`${categoryColors[event.category]} text-xs`}
              variant="secondary"
            >
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </Badge>
          </div>
          {soldPercentage > 80 && (
            <div className="absolute top-3 right-3">
              <Badge variant="destructive" className="text-xs bg-red-500">
                {soldPercentage > 95 ? "Sold Out!" : "Almost Full!"}
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {event.title}
          </h3>

          <div className="space-y-1.5 mb-3">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(event.time)}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-primary">
              ₦{event.price.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              {availableTickets} left
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
