import { useEffect, useState } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import api from "../../api/axios";
import { FiInbox, FiUsers } from "react-icons/fi";

export default function DashboardAdmin() {
  const [badgeCount, setBadgeCount] = useState(0);
  const userName = localStorage.getItem("userName") || "Admin";

  useEffect(() => {
    const fetchBadge = async () => {
      try {
        const res = await api.get("/surat/badge");
        setBadgeCount(res.data.menunggu);
      } catch (err) {
        // badge gagal load — tidak perlu crash
      }
    };
    fetchBadge();
  }, []);

  const NAV_ITEMS = [
    {
      to: "/admin/pengajuan",
      label: "Kelola Pengajuan",
      end: false,
      badge: badgeCount > 0 ? String(badgeCount) : null,
      icon: <FiInbox className="w-5 h-5" />,
    },
    {
      to: "/admin/warga",
      label: "Data Warga",
      end: false,
      icon: <FiUsers className="w-5 h-5" />,
    },
  ];

  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      role="admin"
      userName={userName}
    />
  );
}
