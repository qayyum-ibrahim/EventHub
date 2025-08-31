// Mock Tickets Hook
import { mockMyTickets, mockTransactions, mockOrganizerEvents, mockOrganizerStats } from "@/data/mockData";
import { useState } from "react";
import { toast } from "sonner";

export const usePurchaseTicket = () => {
  const [isPending, setIsPending] = useState(false);

  return {
    isPending,
    mutate: async (params: any, options?: any) => {
      setIsPending(true);
      // Simulate purchase process
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsPending(false);
      
      // Mock success
      toast.success("Ticket purchased successfully!");
      options?.onSuccess?.({
        message: "Ticket purchased successfully",
        authorizationUrl: "https://checkout.paystack.com/mock-payment",
      });
      
      // Redirect to dashboard after successful purchase
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    },
  };
};

export const useSwitchMode = () => {
  const [isPending, setIsPending] = useState(false);

  return {
    isPending,
    mutate: async (params: any, options?: any) => {
      setIsPending(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsPending(false);
      
      // Mock success response
      options?.onSuccess?.({
        data: {
          currentMode: params.mode,
        },
      });
    },
  };
};

export const useTickets = () => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    data: mockMyTickets,
    isLoading,
    refetch: async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    },
  };
};

export const useTransactions = () => {
  return {
    data: mockTransactions,
    isLoading: false,
  };
};

export const useOrganizerOverview = () => {
  return {
    data: mockOrganizerStats,
    isLoading: false,
  };
};

export const useOrganizerEvents = () => {
  return {
    data: mockOrganizerEvents,
    isLoading: false,
  };
};