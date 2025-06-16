import React from "react";
import FlowCard from "./flow-card";
import Link from "next/link";

const HomeView = () => {
  const data = [
    {
      src: "/products.png",
      title: "1. Tambahkan Produk Anda",
      desc: "Masukkan daftar produk yang ingin Anda jual untuk mulai mengotomatisasi penjualan.",
    },
    {
      src: "/ai agents.png",
      title: "2. Buat AI Agent Pintar",
      desc: "Rancang AI Agent yang akan merespons pesan pelanggan secara otomatis dan cepat.",
    },
    {
      src: "/connected platform.png",
      title: "3. Integrasi dengan WhatsApp",
      desc: "Sambungkan AI Agent Anda ke WhatsApp untuk mulai menerima dan membalas pesan.",
    },
    {
      src: "/analytics.png",
      title: "4. Analisis Performa AI Agent",
      desc: "Lihat seberapa baik AI Agent Anda merespons pesan, identifikasi peluang perbaikan.",
    },
  ];

  return (
    <div className="border border-neutral-200 rounded-lg lg:p-5 p-3 shadow-[0_4px_50px_rgba(0,0,0,0.055)]">
      <div className="w-full max-w-xl mx-auto flex flex-col gap-3 items-center">
        <h3 className="text-start text-2xl font-medium text-neutral-700">
          Selamat datang kembali di Zuhaa AI !
        </h3>
        {data?.map((data, idx) => {
          return (
            <FlowCard
              key={idx}
              desc={data.desc}
              src={data.src}
              title={data.title}
            />
          );
        })}
        <Link href={"/"} className="text-blue-500 hover:underline text-sm">
          Butuh bantuan lebih? Lihat Tutorial Youtube kami
        </Link>
      </div>
    </div>
  );
};

export default HomeView;
