import DashboardLayout from "../../Layouts/DashboardLayout";
import { FiFilePlus, FiClock } from "react-icons/fi";

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
  const userName = localStorage.getItem("userName") || "Warga";
  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      role="warga"
      userName={userName}
    />
  );
}
