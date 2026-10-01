import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import { Web3Provider } from "./context/Web3Context.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Web3Provider>
        <App />
      </Web3Provider>
    </ThemeProvider>
  </StrictMode>,
);
