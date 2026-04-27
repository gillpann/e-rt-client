import { formatTanggal } from "../../utils/format";
import StatusBadge from '../common/StatusBadge';

const PengajuanTable = ({ data, onDetail }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 whitespace-nowrap">Kode</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 whitespace-nowrap">Pemohon</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 whitespace-nowrap hidden md:table-cell">Jenis Surat</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 whitespace-nowrap hidden sm:table-cell">Tgl Ajuan</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 whitespace-nowrap hidden lg:table-cell">Tgl Selesai</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 whitespace-nowrap">Status</th>
              <th className="text-left text-xs font-semibold text-slate-400 px-4 py-3 whitespace-nowrap">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-slate-400 text-xs py-10 font-normal">
                  Tidak ada pengajuan.
                </td>
              </tr>
            ) : data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">

                <td className="px-4 py-3.5 text-xs text-slate-400 font-normal whitespace-nowrap">
                  {item.kode}
                </td>

                <td className="px-4 py-3.5">
                  <p className="font-semibold text-slate-800 text-sm whitespace-nowrap">
                    {item.nama_pemohon || item.nama}
                  </p>
                  {item.nama_kepala_keluarga && (
                    <p className="text-[11px] text-slate-400 font-normal whitespace-nowrap">
                      KK: {item.nama_kepala_keluarga}
                    </p>
                  )}
                </td>

                <td className="px-4 py-3.5 hidden md:table-cell max-w-[160px]">
                  <p className="text-xs text-slate-600 truncate">{item.jenis}</p>
                  <p className="text-[11px] text-slate-400 truncate">{item.keperluan}</p>
                </td>

                <td className="px-4 py-3.5 text-xs text-slate-400 font-normal hidden sm:table-cell whitespace-nowrap">
                  {formatTanggal(item.created_at)}
                </td>

                <td className="px-4 py-3.5 text-xs font-normal hidden lg:table-cell whitespace-nowrap">
                  {item.tanggal_selesai ? (
                    <span className="text-primary-700 font-medium">
                      {formatTanggal(item.tanggal_selesai)}
                    </span>
                  ) : (
                    <span className="text-slate-300">Belum Selesai</span>
                  )}
                </td>

                <td className="px-4 py-3.5">
                  <StatusBadge status={item.status} />
                </td>

                <td className="px-4 py-3.5">
                  <button
                    onClick={() => onDetail(item)}
                    className="text-xs font-medium text-primary-700 hover:underline whitespace-nowrap"
                  >
                    Detail →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PengajuanTable;