import { Route, Routes } from "react-router-dom";

import Layout from "./layout/Layout";

import Login from "./auth/Login";
import Register from "./auth/Register";
import RequireAuth from "./auth/RequireAuth";

import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import CreatePropertyPage from "./pages/CreatePropertyPage";
import EditPropertyPage from "./pages/EditPropertyPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route index element={<PropertiesPage />} />

          <Route path="/properties" element={<PropertiesPage />} />

          <Route path="/properties/new" element={<CreatePropertyPage />} />

          <Route
            path="/properties/:propertyId"
            element={<PropertyDetailPage />}
          />

          <Route
            path="/properties/:propertyId/edit"
            element={<EditPropertyPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
