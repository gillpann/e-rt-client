import DashboardLayout from "../../Layouts/DashboardLayout";
import { FiFilePlus, FiClock } from "react-icons/fi";
import { getUserName } from "../../utils/auth";

const NAV_ITEMS = [
  {
    to: "/dashboard/pengajuan",
    label: "Pengajuan Surat",
    end: false,
    icon: <FiFilePlus className="w-5 h-5" />,
  },
  {
    to: "/dashboard/riwayat",
    label: "Riwayat Surat",
    end: false,
    icon: <FiClock className="w-5 h-5" />,
  },
];

export default function DashboardWarga() {
  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      role="warga"
      userName={getUserName()}
    />
  );
}