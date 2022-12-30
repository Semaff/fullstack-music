import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

export const renderWithClient = (component: ReactNode | string) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false
      }
    }
  });

  return render(<QueryClientProvider client={queryClient}>{component}</QueryClientProvider>);
};
