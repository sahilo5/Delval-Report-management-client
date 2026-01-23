import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { AppRoutes } from "./AppRoutes";
import { Toaster } from "./components/ui/Toaster";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-background font-sans text-text-primary">
          <Toaster>
            <AppRoutes />
          </Toaster>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;