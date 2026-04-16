import { formatTanggal } from './../../utils/format';

const WargaTable = ({ warga, filtered, openEdit, setHapusId }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Nama</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">NIK</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3 hidden md:table-cell">Alamat</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3 hidden sm:table-cell">Terdaftar</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-slate-400 text-xs py-10 font-normal">
                  Warga tidak ditemukan.
                </td>
              </tr>
            ) : filtered.map((w) => (
              <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                      <span className="text-primary-700 font-semibold text-xs">
                        {w.nama.charAt(0)}
                      </span>
                    </div>
                    <p className="font-semibold text-slate-800 text-sm">{w.nama}</p>
                  </div>
                </td>

                <td className="px-5 py-3.5 text-xs text-slate-500 font-normal">
                  {w.nik}
                </td>

                <td className="px-5 py-3.5 text-xs text-slate-500 font-normal hidden md:table-cell">
                  {w.alamat || "-"}
                </td>

                <td className="px-5 py-3.5 text-xs text-slate-500 font-normal hidden sm:table-cell whitespace-nowrap">
                  {formatTanggal(w.created_at)}
                </td>

                <td className="px-5 py-3.5">
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border
                    ${w.status === "aktif"
                      ? "bg-primary-50 text-primary-700 border-primary-100"
                      : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                    {w.status === "aktif" ? "Aktif" : "Nonaktif"}
                  </span>
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openEdit(w)}
                      className="text-xs font-medium text-primary-700 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setHapusId(w.id)}
                      className="text-xs font-medium text-red-400 hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
        <p className="text-[11px] text-slate-400 font-normal">
          Menampilkan {filtered.length} dari {warga.length} warga
        </p>
      </div>
    </div>
  );
};

export default WargaTable;