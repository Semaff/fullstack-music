import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { DecoratorFn } from "@storybook/react";

export const withQueryClient: DecoratorFn = (story) => {
  const [queryClient] = useState(new QueryClient());
  return <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>;
};
