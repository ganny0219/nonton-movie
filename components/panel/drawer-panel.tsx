"use client";
import React, { useState } from "react";
import DrawerPanelItem from "./drawer-panel-item";
import { useRouter } from "next/navigation";
// import { signOut } from "next-auth/react";
import { signOut } from "next-auth/react";

type Props = {
  selected: string;
};

function DrawerPanel({ selected }: Props) {
  const [logoutConfirm, setLogutConfirm] = useState(false);
  const router = useRouter();

  const onLogut = async () => {
    await signOut({ redirect: false }).then(() => {
      router.replace("/pandora/auth");
    });
  };
  return (
    <>
      {logoutConfirm && (
        <div className="flex justify-center items-center bg-slate-700 fixed left-0 top-0 h-full w-full bg-opacity-50">
          <div className="flex flex-col  min-w-[15rem]  bg-white rounded p-2">
            <h3 className="text-xl my-2">ARE YOU SURE TO LOGOUT?</h3>
            <div className="flex flex-row justify-center items-center">
              <button className="bg-red-100 p-2 rounded mr-6" onClick={onLogut}>
                YES
              </button>
              <button
                className="bg-red-100 p-2 rounded"
                onClick={() => setLogutConfirm(false)}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="fixed overflow-auto w-[105px] h-full flex flex-col bg-[#cccccc80] shadow-md ">
        <DrawerPanelItem
          title="Movie"
          path="/pandora/movie"
          name="movie"
          selected={selected}
        />
        <DrawerPanelItem
          title="Series"
          path="/pandora/series"
          name="series"
          selected={selected}
        />
        <DrawerPanelItem
          title="Anime"
          path="/pandora/anime"
          name="anime"
          selected={selected}
        />
        <DrawerPanelItem
          title="Drakor"
          path="/pandora/drama-korea"
          name="drama-korea"
          selected={selected}
        />
        <DrawerPanelItem
          title="Featured"
          path="/pandora/featured"
          name="featured"
          selected={selected}
        />
        <DrawerPanelItem
          title="Schedule"
          path="/pandora/schedule"
          name="schedule"
          selected={selected}
        />
        <DrawerPanelItem
          title="GDrive"
          path="/pandora/google-drive"
          name="gdrive"
          selected={selected}
        />
        <DrawerPanelItem
          title="Ads"
          path="/pandora/ads"
          name="ads"
          selected={selected}
        />
        <DrawerPanelItem
          title="Social Media"
          path="/pandora/social-media"
          name="social-media"
          selected={selected}
        />
        <DrawerPanelItem
          title="Config"
          path="/pandora/config"
          name="config"
          selected={selected}
        />
        <button
          onClick={() => setLogutConfirm(true)}
          className={`flex justify-center items-center w-[100%] aspect-video my-2 `}
        >
          <h3 className="font-bold">Logout</h3>
        </button>
      </div>
    </>
  );
}

export default DrawerPanel;
