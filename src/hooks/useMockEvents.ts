// Mock Events Hook
import { mockEvents } from "@/data/mockData";
import { useState } from "react";

export const useEvents = () => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    data: {
      pages: [
        {
          events: mockEvents,
          currentPage: 1,
          totalPages: 1,
          totalEvents: mockEvents.length,
        },
      ],
    },
    isFetching: isLoading,
    refetch: async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
      return { isSuccess: true };
    },
    hasNextPage: false,
    isFetchingNextPage: false,
    fetchNextPage: () => {},
  };
};

export const useEvent = (eventId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const event = mockEvents.find((e) => e._id === eventId);

  return {
    data: event,
    isFetching: isLoading,
    refetch: async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
      return { isSuccess: true };
    },
  };
};