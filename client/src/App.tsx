import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { DocsLayout } from "./components/DocsLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage, AboutPage, ContactPage, UsernameEntryPage, MockPage } from "./pages";
import {
  DocsIntroduction,
  DocsQuickStart,
  DocsInstallation,
  DocsSendingLogs,
  DocsLogLevels,
  DocsLogFormat,
  DocsSearch,
  DocsFiltering,
  DocsStorage,
} from "./pages/docs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Username Entry Page - tidak perlu protection */}
        <Route path="/username-entry" element={<UsernameEntryPage />} />

        {/* Protected Routes - hanya bisa diakses jika sudah terdaftar */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Main Pages */}
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="mock" element={<MockPage />} />

          {/* Documentation Pages */}
          <Route path="docs" element={<DocsLayout />}>
            <Route index element={<DocsIntroduction />} />
            <Route path="quickstart" element={<DocsQuickStart />} />
            <Route path="installation" element={<DocsInstallation />} />
            <Route path="sending-logs" element={<DocsSendingLogs />} />
            <Route path="log-levels" element={<DocsLogLevels />} />
            <Route path="log-format" element={<DocsLogFormat />} />
            <Route path="search" element={<DocsSearch />} />
            <Route path="filtering" element={<DocsFiltering />} />
            <Route path="storage" element={<DocsStorage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
