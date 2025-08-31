import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-bg px-4">
      <Card className="w-full max-w-md card-elegant">
        <CardContent className="pt-6 text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-primary-light rounded-full flex items-center justify-center">
            <Search className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">404</h1>
            <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-muted-foreground">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
          <div className="space-y-3">
            <Button asChild className="w-full btn-hero">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/events">Browse Events</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
