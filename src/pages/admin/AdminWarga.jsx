import { useEffect, useState } from "react";
import { FiLoader, FiPlus } from "react-icons/fi";
import { useWarga } from "../../hooks/useWarga";

import WargaTable         from "../../components/admin/WargaTable";
import WargaFormModal     from "../../components/admin/WargaFormModal";
import WargaSummary       from "../../components/admin/WargaSummary";
import SearchInput        from "../../components/admin/SearchInput";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import Pagination         from "../../components/admin/Pagination";

const ITEMS_PER_PAGE = 5;

export default function AdminWarga() {
  const {
    warga,
    loading,
    search,
    setSearch,
    debouncedSearch,
    showForm,
    setShowForm,
    editData,
    form,
    setForm,
    formError,
    submitting,
    hapusId,
    setHapusId,
    openTambah,
    openEdit,
    handleSubmit,
    handleHapus,
  } = useWarga();

  const [currentPage, setCurrentPage] = useState(1);

  // Reset halaman saat search berubah
  useEffect(() => { setCurrentPage(1); }, [debouncedSearch]);

  const filtered = warga.filter((w) =>
    w.nama.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    w.nik.includes(debouncedSearch)
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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

      <WargaSummary warga={warga} />

      <SearchInput search={search} setSearch={setSearch} />

      {/* Kirim paginated, bukan filtered langsung */}
      <WargaTable
        warga={warga}
        filtered={paginated}
        openEdit={openEdit}
        setHapusId={setHapusId}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

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

      <ConfirmDeleteModal
        hapusId={hapusId}
        setHapusId={setHapusId}
        handleHapus={handleHapus}
      />
    </div>
  );
}