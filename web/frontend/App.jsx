import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu, Provider } from "@shopify/app-bridge-react";
import Routes from "./Routes";

import { QueryProvider, PolarisProvider } from "./components";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
    eager: true,
  });
  const { t } = useTranslation();

  // Shopify App Bridge config
  const shopOrigin = new URLSearchParams(window.location.search).get("shop");
  const apiKey = "7083eb5698cc9c072193e6d9424a1a9b"; // <-- Replace with your actual API key

  const config = {
    apiKey,
    shopOrigin,
    forceRedirect: true,
  };

  return (
    <Provider config={config}>
      <PolarisProvider>
        <BrowserRouter>
          <QueryProvider>
            <NavMenu>
              <a href="/" rel="home" />
              <a href="/submissions">Submissions</a>
            </NavMenu>
            <Routes pages={pages} />
          </QueryProvider>
        </BrowserRouter>
      </PolarisProvider>
    </Provider>
  );
}
