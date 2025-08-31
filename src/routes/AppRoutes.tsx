import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventDetails from "@/pages/EventDetails";
import Events from "@/pages/Events";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
