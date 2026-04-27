import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { saveAuth, getRedirectPath } from "../utils/auth";

import LoginTopBar from "../components/login/LoginTopBar";
import LoginForm   from "../components/login/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();

  const [nik, setNik]           = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!nik || !password) {
      setError("NIK dan password wajib diisi.");
      return;
    }
    if (nik.length !== 16) {
      setError("NIK harus tepat 16 digit.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { nik, password });

      saveAuth({
        token: data.token,
        role:  data.user.role,
        nama:  data.user.nama,
        user:  data.user,
      });

      navigate(getRedirectPath(data.user.role), { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-poppins">

      <LoginTopBar />

      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">

          <LoginForm
            nik={nik}
            setNik={setNik}
            password={password}
            setPassword={setPassword}
            showPass={showPass}
            setShowPass={setShowPass}
            error={error}
            loading={loading}
            onSubmit={handleLogin}
          />

          <div className="mt-5 text-center">
            <p className="text-xs text-slate-400 font-normal leading-relaxed">
              Belum punya akun?{" "}
              <span className="text-primary-700 font-medium">Hubungi pengurus RT 03</span>{" "}
              untuk didaftarkan.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-[10px] text-slate-300 font-normal">
        © {new Date().getFullYear()} e-RT Warga · RT 03 / RW 08
      </div>
    </div>
  );
}