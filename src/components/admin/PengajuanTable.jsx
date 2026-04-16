import { STATUS_CONFIG } from "../../utils/Status";
import { formatTanggal } from "../../utils/format";

const PengajuanTable = ({ data, onDetail }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">ID</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Nama Warga</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3 hidden md:table-cell">Jenis Surat</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3 hidden sm:table-cell">Tanggal</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-5 py-3">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-slate-400 text-xs py-10 font-normal">
                  Tidak ada pengajuan.
                </td>
              </tr>
            ) : data.map((item) => {
              const cfg = STATUS_CONFIG[item.status];

              return (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 text-xs text-slate-400 font-normal whitespace-nowrap">
                    {item.kode}
                  </td>

                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-slate-800 text-sm">{item.nama}</p>
                    <p className="text-[11px] text-slate-400 font-normal">{item.nik}</p>
                  </td>

                  <td className="px-5 py-3.5 hidden md:table-cell max-w-[180px]">
                    <p className="text-xs text-slate-600 truncate">{item.jenis}</p>
                    <p className="text-[11px] text-slate-400 truncate">{item.keperluan}</p>
                  </td>

                  <td className="px-5 py-3.5 text-xs text-slate-400 font-normal hidden sm:table-cell whitespace-nowrap">
                    {formatTanggal(item.created_at)}
                  </td>

                  <td className="px-5 py-3.5">
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                      {cfg.label}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => onDetail(item)}
                      className="text-xs font-medium text-primary-700 hover:underline whitespace-nowrap"
                    >
                      Detail →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PengajuanTable;