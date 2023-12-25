import React, { ReactNode } from "react";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";

import ChevronLeftIcon from "@/assets/icons/chevron-left-icon";
import ChevronRightIcon from "@/assets/icons/chevron-right-icon";
import { Movie } from "@/types/movie";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const nextButton: ReactNode = (
  <div className="flex justify-center items-center bg-[#313131] w-10 aspect-square rounded">
    <ChevronRightIcon />
  </div>
);

const prevButton: ReactNode = (
  <div className="flex justify-center items-center bg-[#313131] w-10 aspect-square rounded">
    <ChevronLeftIcon />
  </div>
);

type Props = {
  movieLength: number;
  moviePerPage: number;
  offset: number;
  url: string;
};

const Pagination = ({ moviePerPage, movieLength, offset, url }: Props) => {
  const isMobile = false;
  const router = useRouter();
  const startOffset = offset - 1;
  const pageCount = Math.ceil(movieLength / moviePerPage);

  // const endOffset = startOffset + itemsPerPage;
  // const currentItems = items.slice(startOffset, endOffset);

  const handlePageClick = (event: { selected: number }) => {
    router.push(`${url}/${event.selected + 1}`);
  };
  return (
    <>
      <ReactPaginate
        forcePage={startOffset}
        breakLabel=". ."
        nextLabel={nextButton}
        onPageChange={handlePageClick}
        pageRangeDisplayed={isMobile ? 2 : 3}
        marginPagesDisplayed={isMobile ? 1 : 2}
        pageCount={pageCount}
        previousLabel={prevButton}
        containerClassName="flex flex-row justify-center items-center w-full my-6"
        pageClassName="flex justify-center items-center p-2 bg-[#313131] mx-2 aspect-square w-10 rounded"
        activeClassName="bg-secondary text-black"
      />
    </>
  );
};

export default Pagination;
