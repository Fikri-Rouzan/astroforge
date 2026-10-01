import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { useWeb3 } from "./hooks/useWeb3.js";
import { Navbar } from "./components/Navbar.js";
import { LandingPage } from "./pages/LandingPage.js";
import { ProtectedRoute } from "./components/ProtectedRoute.js";
import { DashboardPage } from "./pages/DashboardPage.js";

export default function App() {
  const { walletAddress, playerProfile } = useWeb3();
  const isAuthenticated = !!walletAddress && !!playerProfile;

  return (
    <BrowserRouter>
      <div className="bg-cosmic-bg text-cosmic-text min-h-screen font-body flex flex-col">
        <Toaster
          position="top-center"
          toastOptions={{
            className: "cosmic-toast",
            duration: 4000,
          }}
        />

        <Navbar />

        <Routes>
          {/* Public landing page */}
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <LandingPage />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            }
          />

          {/* Protected game dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Route for handling 404 errors */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
