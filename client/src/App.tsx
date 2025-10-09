import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConfigProvider, theme } from "antd";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Actions from "./pages/Actions";
import NotFound from "@/pages/not-found";
import { app as firebaseApp } from "./lib/firebase";
import { useEffect } from "react";
import { getAuth, signInAnonymously } from "firebase/auth";
import { toast } from "@/hooks/use-toast";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/actions" component={Actions} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Ensure firebaseApp is initialized by import; no-op reference to avoid tree-shaking removal
  void firebaseApp;
  
  // Attempt anonymous auth so Firestore rules that require authentication can be satisfied
  useEffect(() => {
    // Skip auth if Firebase app isn't initialized (e.g., missing env vars in dev)
    if (!firebaseApp) {
      console.warn("Firebase app not initialized; skipping auth.");
      return;
    }
  
    try {
      const auth = getAuth(firebaseApp);
      if (!auth.currentUser) {
        signInAnonymously(auth).catch((err: any) => {
          const code = err?.code ?? "";
          if (code === "auth/operation-not-allowed") {
            // Provider not enabled in console; surface actionable guidance
            toast({
              title: "Anonymous sign-in not enabled",
              description:
                "Enable Anonymous provider in Firebase Console (Authentication > Sign-in method) or disable auth in dev.",
              variant: "destructive",
            });
          } else {
            // Avoid noisy toasts for configuration-not-found and other non-critical dev errors
            console.warn("Auth sign-in error:", err);
          }
        });
      }
    } catch (err: unknown) {
      console.warn("Auth initialization error:", err);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              colorPrimary: '#1890ff',
              borderRadius: 6,
            },
          }}
        >
          <AdminLayout>
            <Router />
          </AdminLayout>
          <Toaster />
        </ConfigProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
