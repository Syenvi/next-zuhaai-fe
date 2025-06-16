import Image from "next/image";
import React from "react";

const FlowCard = ({
  src,
  title,
  desc,
}: {
  src: string;
  title: string;
  desc: string;
}) => {
  return (
    <section className="flex items-center gap-5 rounded-lg border border-neutral-200 p-2 shadow-[0_4px_50px_rgba(0,0,0,0.025)]">
      <Image alt={title} src={src} width={60} height={60} />
      <div className="leading-6">
        <h3 className="font-bold text-neutral-700">{title}</h3>
        <p className="text-neutral-500 text-sm">{desc}</p>
      </div>
    </section>
  );
};

export default FlowCard;
