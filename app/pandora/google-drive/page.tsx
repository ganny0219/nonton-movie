import Field from "@/components/field/field";
import FieldHorizontal from "@/components/field/field-horizontal";
import Line from "@/components/line";
import AdsItem from "@/components/panel/ads/ads-item";
import RootPanel from "@/components/panel/root-panel";
import movie from "@/pages/api/rss/movie";
import { Ads } from "@/types/ads";
import { Movie } from "@/types/movie";
import { FeaturedData } from "@/types/featured";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";
import FeaturedContainer from "@/components/panel/featured/featured-container";
import { apiAxios } from "@/utils/axios";
import GDriveHeaderTable from "@/components/panel/google-drive/gdrive-header-table";
import GDriveItemTable from "@/components/panel/google-drive/gdrive-item-table";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import { GoogleDrive } from "@/types/google-drive";
import ChevronRightIcon from "@/assets/icons/chevron-right-icon";
import ChevronLeftIcon from "@/assets/icons/chevron-left-icon";
import GDriveCreateModal from "@/components/panel/google-drive/gdrive-create-modal";
import GDriveUpdateModal from "@/components/panel/google-drive/gdrive-update-modal";
import { getGoogleDriveListPanel } from "@/utils/server-function/google-drive";

type Props = {
  gdrive: GoogleDrive[];
};

const nextButton: ReactNode = (
  <div className="flex justify-center items-center bg-[#ccc] w-10 aspect-square rounded">
    <ChevronRightIcon />
  </div>
);

const prevButton: ReactNode = (
  <div className="flex justify-center items-center bg-[#ccc] w-10 aspect-square rounded">
    <ChevronLeftIcon />
  </div>
);

function GDrivePanelPage({ gdrive }: Props) {
  const [gdriveList, setGdriveList] = useState<GoogleDrive[]>(gdrive);

  const [gdriveCreateModal, setGdriveCreateModal] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedPage, setSelectedPage] = useState(0);
  const itemsPerPage = 30;
  // const [searchInput, setSearchInput] = useState("");

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGdriveList((prev) => {
      setSelectedPage(0);
      if (e.target.value != "") {
        const prevGdrive = [...gdrive];
        const newGdrive = [];
        for (let gdrive of prevGdrive) {
          if (
            gdrive.googleId
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            gdrive.movieTitle
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            gdrive.imdbId.toLowerCase().includes(e.target.value.toLowerCase())
          ) {
            newGdrive.push(gdrive);
          }
        }
        const newOffset = (0 * itemsPerPage) % newGdrive.length;
        setItemOffset(newOffset);
        return newGdrive;
      }
      const newOffset = (0 * itemsPerPage) % gdrive.length;
      setItemOffset(newOffset);
      return gdrive;
    });
  };

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = gdriveList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(gdriveList.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % gdriveList.length;
    setItemOffset(newOffset);
    setSelectedPage(event.selected);
  };

  const gdriveCreateModalHandler = () => {
    setGdriveCreateModal((prev) => !prev);
  };

  return (
    <>
      <GDriveCreateModal
        visible={gdriveCreateModal}
        onClose={gdriveCreateModalHandler}
        setGdriveList={setGdriveList}
      />

      <RootPanel selected="gdrive">
        <div className="flex flex-row justify-between items-center px-4 mt-4 mb-2 ">
          <h1 className="text-2xl">Google Drive List</h1>
          <div>
            <input
              onChange={searchInputHandler}
              className="bg-[#cccccc70] mr-4 rounded px-2 py-2 outline-none"
              placeholder="Search..."
            />
            <button className="bg-tertiary py-2 px-4 rounded mr-4">
              Upload
            </button>
            <button
              className="bg-tertiary py-2 px-4 rounded"
              onClick={gdriveCreateModalHandler}
            >
              Create Drive
            </button>
          </div>
        </div>
        <Line thin color="#00000050" />
        <div className="p-2">
          <GDriveHeaderTable />
          {currentItems?.map((gdrive, gdriveIndex) => {
            return (
              <GDriveItemTable
                key={gdriveIndex}
                gdriveIndex={gdriveIndex}
                data={gdrive}
                odd={gdriveIndex % 2 == 0}
                setGdriveList={setGdriveList}
              />
            );
          })}
          <ReactPaginate
            forcePage={selectedPage}
            breakLabel=". . ."
            nextLabel={nextButton}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel={prevButton}
            containerClassName="flex flex-row justify-center items-center w-full my-6"
            activeClassName="bg-secondary text-black"
            pageClassName="flex justify-center items-center p-2 bg-[#cccccc70] mx-2 aspect-square w-10 rounded"
          />
        </div>
      </RootPanel>
    </>
  );
}

export default GDrivePanelPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/pandora/auth",
      },
    };
  }

  const gdrive = await getGoogleDriveListPanel();

  return {
    props: {
      gdrive: gdrive,
    },
  };
};
