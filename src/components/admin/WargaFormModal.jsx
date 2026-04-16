import { FiX } from "react-icons/fi";

const WargaFormModal = ({
  showForm,
  setShowForm,
  editData,
  form,
  setForm,
  formError,
  handleSubmit,
  submitting,
}) => {
  if (!showForm) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
      onClick={() => setShowForm(false)}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <p className="font-bold text-slate-900 text-base">
            {editData ? "Edit Data Warga" : "Tambah Warga Baru"}
          </p>

          <button
            onClick={() => setShowForm(false)}
            className="text-slate-400 hover:text-slate-600"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {[
            { label: "Nama Lengkap", field: "nama", placeholder: "Contoh: Budi Santoso" },
            { label: "NIK (16 digit)", field: "nik", placeholder: "16 digit NIK", maxLen: 16, numeric: true },
            { label: "Alamat", field: "alamat", placeholder: "Jl. Contoh No. 1" },
            { label: "No. HP", field: "no_hp", placeholder: "08xxxxxxxxxx" },
          ].map((f) => (
            <div key={f.field}>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {f.label}
              </label>

              <input
                type="text"
                value={form[f.field]}
                maxLength={f.maxLen}
                onChange={(e) => {
                  const v = f.numeric
                    ? e.target.value.replace(/\D/g, "")
                    : e.target.value;

                  setForm((p) => ({ ...p, [f.field]: v }));
                }}
                placeholder={f.placeholder}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password{" "}
              {editData && (
                <span className="text-slate-300 font-normal">
                  (kosongkan jika tidak diganti)
                </span>
              )}
            </label>

            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((p) => ({ ...p, password: e.target.value }))
              }
              placeholder={
                editData
                  ? "Isi jika ingin ganti password"
                  : "Password untuk login"
              }
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Status
            </label>

            <div className="grid grid-cols-2 gap-2">
              {["aktif", "nonaktif"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, status: s }))}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all
                    ${form.status === s
                      ? s === "aktif"
                        ? "bg-primary-700 text-white border-primary-700"
                        : "bg-slate-600 text-white border-slate-600"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                >
                  {s === "aktif" ? "Aktif" : "Nonaktif"}
                </button>
              ))}
            </div>
          </div>

          {formError && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-xl">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary-700 hover:bg-primary-800 disabled:opacity-60 text-white font-semibold text-sm py-3 rounded-xl transition-all mt-1"
          >
            {submitting
              ? "Menyimpan..."
              : editData
              ? "Simpan Perubahan"
              : "Tambah Warga"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WargaFormModal;