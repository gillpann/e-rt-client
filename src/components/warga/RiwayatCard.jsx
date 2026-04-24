import { useState } from "react";
import api from "../../api/axios";
import RiwayatCardHeader from "./RiwayatCardHeader";
import RiwayatCardDetail from "./RiwayatCardDetail";

export default function RiwayatCard({ item, isOpen, toggle }) {

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden">
      <RiwayatCardHeader
        item={item}
        isOpen={isOpen}
        onToggle={() => toggle(item.id)}
      />
      {isOpen && (
        <RiwayatCardDetail
          item={item}
        />
      )}
    </div>
  );
}