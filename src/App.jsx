import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

// Warga
import DashboardWarga from "./pages/warga/DashboardWarga";
import Pengajuan from "./pages/warga/Pengajuan";
import Riwayat from "./pages/warga/Riwayat";

// Admin
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import AdminPengajuan from "./pages/admin/AdminPengajuan";
import AdminWarga from "./pages/admin/AdminWarga";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard Warga — hanya role warga */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="warga">
              <DashboardWarga />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="pengajuan" replace />} />
          <Route path="pengajuan" element={<Pengajuan />} />
          <Route path="riwayat" element={<Riwayat />} />
        </Route>

        {/* Dashboard Admin — hanya role admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="pengajuan" replace />} />
          <Route path="pengajuan" element={<AdminPengajuan />} />
          <Route path="warga" element={<AdminWarga />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}