import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary as ErrorBoundaryContainer } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { LayoutDefault } from "@common/Layout";
import { DropdownProvider } from "@components/Dropdown";
import { ErrorBoundary } from "@features/Error";

import CommonRoutes from "./app/Routes/CommonRoutes";
import { store } from "./app/store";
import { AxiosProvider, LoadingOverlay, LoadingOverlayProvider } from "./common/Company/Components";
import { Head } from "./common/Company/Components/Head";

import "./locales/config";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ErrorBoundaryContainer FallbackComponent={ErrorBoundary}>
          <Suspense fallback={<LoadingOverlay id="app" />}>
            <Head />
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <LayoutDefault>
                  <CommonRoutes />
                </LayoutDefault>
                <AxiosProvider />
              </BrowserRouter>
            </QueryClientProvider>
          </Suspense>
        </ErrorBoundaryContainer>
      </HelmetProvider>
      <DropdownProvider />
      <ToastContainer />
      <LoadingOverlayProvider />
    </Provider>
  );
};

export default App;
