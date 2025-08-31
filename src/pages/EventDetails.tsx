import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/seperator";
import {
  Calendar,
  MapPin,
  Users,
  User,
  ArrowLeft,
  Minus,
  Plus,
  CreditCard,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { useEvent } from "@/hooks/useMockEvents";
import { categoryColors } from "@/utils/helpers";
import { usePurchaseTicket } from "@/hooks/useMockTickets";
import { toast } from "sonner";
import { calculatePaystackFee } from "@/utils/paystackFeeCalculator";
import LoadingScreen from "@/components/ui/loadingScreen";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";

export default function EventDetails() {
  const { eventId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { user } = useAuth();
  const { data: event, isFetching, refetch } = useEvent(eventId);
  const purchaseMutation = usePurchaseTicket();
  const [showCompletedModal, setShowCompletedModal] = useState(false);

  const handlePurchase = () => {
    if (!user?._id) {
      toast.warning("Please login to purchase ticket.");
      return;
    }
    if (event?.status === "past") {
      setShowCompletedModal(true);
      return;
    }

    // Simplified purchase flow - no attendee modal needed
    proceedToPayment();
  };

  const proceedToPayment = () => {
    // Mock purchase process
    purchaseMutation.mutate({
      eventId,
      quantity,
      paymentGateway: "paystack",
    });
  };

  if (isFetching) {
    return <LoadingScreen message="Loading event details..." />;
  }
  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <Button variant="outline" asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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
  const subtotal = event.price * quantity;
  const finalFee = calculatePaystackFee(subtotal);
  const total = subtotal + finalFee;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= Math.min(availableTickets, 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleRefresh = async () => {
    if ((await refetch()).isSuccess) {
      toast.success("Event details information has been updated.");
    } else {
      toast.error("Event details failed to update.");
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: `Check out this event: ${event.title}`,
      url: window.location.href,
    };

    try {
      if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
        await navigator.share(shareData);
        toast("✅ Share this event using your favorite app.");
      } else {
        await navigator.clipboard.writeText(
          `Check out this event: ${event.title} ${window.location.href}`
        );
        toast("✅ Link copied to clipboard");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast("✅ Link copied to clipboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div>
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" asChild>
            <Link to="/events">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </Button>
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Image and Basic Info */}
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={event?.image?.url}
                  alt={event?.title}
                  className="w-full h-64 lg:h-80 object-cover"
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
                      {soldPercentage > 95 ? "Sold Out!" : "Almost Sold Out!"}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {event.title}
                </h1>

                <div className="flex items-center space-x-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>Organized by {event.organizerName}</span>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Date & Time</div>
                        <div className="text-muted-foreground">
                          {formatDate(event.date)}
                        </div>
                        <div className="text-muted-foreground">
                          {formatTime(event.time)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-muted-foreground">
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Availability</div>
                        <div className="text-muted-foreground">
                          {availableTickets} of {event.totalTickets} tickets
                          remaining
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${soldPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <CreditCard className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Price</div>
                        <div className="text-2xl font-bold text-primary">
                          ₦{event.price.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          per ticket
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Ticket Purchase Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">Get Your Tickets</h2>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium">Ticket Price</span>
                      <span className="text-xl font-bold text-primary">
                        ₦{event.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="font-medium">Quantity</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityChange(1)}
                          disabled={quantity >= Math.min(availableTickets, 10)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground mb-4">
                      Maximum 10 tickets per purchase
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>
                        Subtotal ({quantity} ticket{quantity > 1 ? "s" : ""})
                      </span>
                      <span>₦{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Processing fee</span>
                      <span>₦{finalFee.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary">
                        ₦{total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePurchase}
                    disabled={
                      availableTickets === 0 ||
                      purchaseMutation.isPending ||
                      event.status === "past"
                    }
                  >
                    {availableTickets === 0
                      ? "Sold Out"
                      : event.status === "past"
                      ? window.innerWidth < 640
                        ? "Completed"
                        : "Event Completed"
                      : purchaseMutation.isPending
                      ? "Purchasing..."
                      : "Purchase Tickets"}
                  </Button>
                  {event?.status === "past" && (
                    <div className="text-xs text-muted-foreground text-center mt-2">
                      This event has ended. Ticket purchases are no longer
                      available.
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground text-center">
                    Secure payment processed by Paystack
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Event Completed Modal */}
      <Dialog open={showCompletedModal} onOpenChange={setShowCompletedModal}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-2xl">
              This event has been completed
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Ticket sales for this event are now closed.
            </p>
            <Button
              className="w-full"
              onClick={() => setShowCompletedModal(false)}
              asChild
            >
              <Link to="/events">Browse Other Events</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
