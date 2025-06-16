"use client";
// third party import
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generatePagination } from "./util";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

// project import

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: string | number) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", pageNumber.toString());
    return `${pathname}?${updatedParams.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  const PaginationNumber = ({
    page,
    to,
    position,
    isActive,
  }: {
    page: number | string;
    to: string;
    position: string | undefined;
    isActive: boolean;
  }) => {
    const className = clsx(
      "flex items-center justify-center w-10 h-10 text-sm rounded-md duration-200 ease-in-out border font-medium ",
      {
        "rounded-r-sm": position === "first" || position === "single",
        "rounded-l-sm": position === "last" || position === "single",
        " bg-primary text-white border-primary": isActive,
        "hover:bg-primary text-text_primary hover:text-white hover:border-primary border-text_third":
          !isActive && position !== "middle",
        "text-text_primary pointer-events-none": position == "middle",
      }
    );

    return isActive && position === "middle" ? (
      <div className={className}>{page}</div>
    ) : (
      <Link href={to} className={className}>
        {page}
      </Link>
    );
  };

  const PaginationArrow = ({
    to,
    direction,
    isDisabled,
  }: {
    to: string;
    direction: string;
    isDisabled: boolean;
  }) => {
    const className = clsx(
      "flex font-medium duration-200 ease-in-out items-center justify-center min-w-max p-2 rounded-md text-sm border text-text_primary hover:bg-primary hover:border-primary hover:text-white",
      {
        "pointer-event-none cursor-not-allowed opacity-20": isDisabled,
        "hover:bg-gray-10 ": !isDisabled,
        "mr-2": direction === "left",
        "ml-2": direction === "right",
      }
    );

    const icon =
      direction == "left" ? (
        <div className="flex items-center gap-2 font-medium">
          <ChevronLeft size={20} />
          <p className="hidden lg:flex">Sebelumnya</p>
        </div>
      ) : (
        <div className="flex items-center gap-2 font-medium">
          <p className="hidden lg:flex">Berikutnya</p>
          <ChevronRight size={20} />
        </div>
      );

    return isDisabled ? (
      <div className={className}>{icon}</div>
    ) : (
      <Link className={className} href={to}>
        {icon}
      </Link>
    );
  };

  return (
    <div className="flex justify-center">
      <PaginationArrow
        direction="left"
        to={createPageURL(JSON.stringify(currentPage - 1))}
        isDisabled={currentPage <= 1}
      />

      <div className="flex gap-1 lg:gap-2">
        {allPages.map((page, index) => {
          let position;
          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={index}
              to={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="right"
        to={createPageURL(JSON.stringify(currentPage + 1))}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
};

export default Pagination;
