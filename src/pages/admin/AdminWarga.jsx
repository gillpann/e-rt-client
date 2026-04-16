import { useState, useEffect } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { FiLoader, FiPlus } from "react-icons/fi";

import WargaTable from "../../components/admin/WargaTable";
import WargaFormModal from "../../components/admin/WargaFormModal";
import WargaSummary from "../../components/admin/WargaSummary";
import SearchInput from "../../components/admin/SearchInput";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";

import { validateWargaForm } from "../../utils/validation";

const EMPTY_FORM = {
  nama: "",
  nik: "",
  no_hp: "",
  alamat: "",
  password: "",
  status: "aktif",
};

export default function AdminWarga() {
  const [warga, setWarga] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 search + debounce
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hapusId, setHapusId] = useState(null);

  const fetchWarga = async () => {
    try {
      const res = await api.get("/warga");
      setWarga(res.data.warga);
    } catch (err) {
      toast.error("Gagal memuat data warga.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarga();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  const filtered = warga.filter((w) =>
    w.nama.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    w.nik.includes(debouncedSearch)
  );

  const openTambah = () => {
    setEditData(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (w) => {
    setEditData(w);
    setForm({
      nama: w.nama,
      nik: w.nik,
      no_hp: w.no_hp || "",
      alamat: w.alamat || "",
      password: "",
      status: w.status,
    });
    setFormError("");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const error = validateWargaForm(form, editData);
    if (error) return setFormError(error);

    setSubmitting(true);
    try {
      if (editData) {
        await api.put(`/warga/${editData.id}`, form);
        toast.success("Data warga berhasil diupdate.");
      } else {
        await api.post("/warga", form);
        toast.success("Warga baru berhasil ditambahkan.");
      }

      setShowForm(false);
      fetchWarga();
    } catch (err) {
      setFormError(err.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleHapus = async () => {
    try {
      await api.delete(`/warga/${hapusId}`);
      toast.success("Warga berhasil dihapus.");
      setHapusId(null);
      fetchWarga();
    } catch (err) {
      toast.error(err.response?.data?.message || "Gagal menghapus warga.");
      setHapusId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="font-bold text-slate-900 text-xl">Data Warga</h1>
        </div>
        <div className="flex items-center justify-center py-20">
          <FiLoader className="w-6 h-6 animate-spin text-primary-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="font-bold text-slate-900 text-xl">Data Warga</h1>
          <p className="text-slate-400 text-sm font-normal mt-1">
            Kelola daftar warga terdaftar di RT 03 / RW 08.
          </p>
        </div>

        <button
          onClick={openTambah}
          className="bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0"
        >
          <FiPlus className="w-4 h-4" />
          Tambah Warga
        </button>
      </div>

      {/* Summary */}
      <WargaSummary warga={warga} />

      {/* Search */}
      <SearchInput search={search} setSearch={setSearch} />

      {/* Table */}
      <WargaTable
        warga={warga}
        filtered={filtered}
        openEdit={openEdit}
        setHapusId={setHapusId}
      />

      {/* Modal Form */}
      <WargaFormModal
        showForm={showForm}
        setShowForm={setShowForm}
        editData={editData}
        form={form}
        setForm={setForm}
        formError={formError}
        handleSubmit={handleSubmit}
        submitting={submitting}
      />

      {/* Confirm Delete */}
      <ConfirmDeleteModal
        hapusId={hapusId}
        setHapusId={setHapusId}
        handleHapus={handleHapus}
      />
    </div>
  );
}