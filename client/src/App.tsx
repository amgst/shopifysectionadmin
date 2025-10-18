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
