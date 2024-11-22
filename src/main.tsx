import "./index.css";

import { createRoot } from "react-dom/client";
import { Development } from "./development";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <Development />
    </QueryClientProvider>
  </StrictMode>
);
