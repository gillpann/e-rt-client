import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { validateWargaForm } from "../utils/validation";

const EMPTY_FORM = {
  nama:     "",
  nik:      "",
  no_hp:    "",
  alamat:   "",
  password: "",
  status:   "aktif",
};

export function useWarga() {
  const [warga, setWarga]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showForm, setShowForm]     = useState(false);
  const [editData, setEditData]     = useState(null);
  const [form, setForm]             = useState(EMPTY_FORM);
  const [formError, setFormError]   = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hapusId, setHapusId]       = useState(null);

  // ── Fetch 
  const fetchWarga = useCallback(async () => {
    try {
      const res = await api.get("/warga");
      setWarga(res.data.warga);
    } catch {
      toast.error("Gagal memuat data warga.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWarga(); }, [fetchWarga]);

  // ── Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // ── Modal helpers 
  const openTambah = () => {
    setEditData(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (w) => {
    setEditData(w);
    setForm({
      nama:     w.nama,
      nik:      w.nik,
      no_hp:    w.no_hp   || "",
      alamat:   w.alamat  || "",
      password: "",
      status:   w.status,
    });
    setFormError("");
    setShowForm(true);
  };

  // ── Submit (tambah / edit) 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const error = validateWargaForm(form, editData);
    if (error) { setFormError(error); return; }

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

  // ── Hapus 
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

  return {
    // data
    warga,
    loading,
    refetch: fetchWarga,
    // search
    search,
    setSearch,
    debouncedSearch,
    // form modal
    showForm,
    setShowForm,
    editData,
    form,
    setForm,
    formError,
    submitting,
    // delete modal
    hapusId,
    setHapusId,
    // actions
    openTambah,
    openEdit,
    handleSubmit,
    handleHapus,
  };
}