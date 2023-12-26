import DeleteConfirm from "@/components/delete-confirm";
import FieldHorizontal from "@/components/field/field-horizontal";
import { Ads } from "@/types/ads";
import { apiAxios, baseAxios } from "@/utils/axios";
import axios from "axios";
import React, { useState } from "react";

type Props = {
  ads: Ads;
  adsIndex: number;
  setFullAds: React.Dispatch<React.SetStateAction<Ads[]>>;
  setHalfAds: React.Dispatch<React.SetStateAction<Ads[]>>;
};

function AdsItem({ ads, adsIndex, setFullAds, setHalfAds }: Props) {
  const [edit, setEdit] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const onInputAdsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (ads.type == "full") {
      setFullAds((prev) => {
        const newDataAds = [...prev];
        newDataAds[adsIndex] = {
          ...newDataAds[adsIndex],
          [key]: e.target.value,
        };
        return newDataAds;
      });
    } else {
      setHalfAds((prev) => {
        const newDataAds = [...prev];
        newDataAds[adsIndex] = {
          ...newDataAds[adsIndex],
          [key]: e.target.value,
        };
        return newDataAds;
      });
    }
  };

  const editSave = async () => {
    await baseAxios.patch(
      `/ads/update`,
      {
        dataAds: ads,
      },
      {}
    );

    return setEdit(false);
  };

  const onEdit = () => {
    if (edit) {
      return editSave();
    } else {
      setEdit(true);
    }
  };

  const onDeleteConfirmClose = () => {
    setDeleteConfirm(false);
  };

  const onDeleteAds = async () => {
    await apiAxios.delete(`/ads/delete`, {
      params: {
        adsId: ads.id,
      },
    });
    if (ads.type == "full") {
      onDeleteConfirmClose();
      setFullAds((prev) => {
        const newDataAds = [...prev];
        newDataAds.splice(adsIndex, 1);
        return newDataAds;
      });
    } else {
      onDeleteConfirmClose();
      setHalfAds((prev) => {
        const newDataAds = [...prev];
        newDataAds.splice(adsIndex, 1);
        return newDataAds;
      });
    }
  };

  return (
    <>
      <DeleteConfirm
        visible={deleteConfirm}
        onClose={onDeleteConfirmClose}
        onConfirm={onDeleteAds}
      />
      <div className="flex flex-row items-center">
        <FieldHorizontal
          disabled={!edit}
          name="Sequence"
          value={ads.sequence.toString()}
          conf={{ onChange: (e) => onInputAdsChange(e, "sequence") }}
        />
        <FieldHorizontal
          disabled={!edit}
          name="Name"
          value={ads.name}
          conf={{ onChange: (e) => onInputAdsChange(e, "name") }}
        />
        <FieldHorizontal
          disabled={!edit}
          name="Url"
          value={ads.url}
          conf={{ onChange: (e) => onInputAdsChange(e, "url") }}
        />
        <button className="bg-[#fff] rounded-md p-1 mr-2" onClick={onEdit}>
          {!edit ? "Edit" : "Save"}
        </button>
        <button
          className="bg-red-500 w-[10%] aspect-square rounded-md"
          onClick={() => setDeleteConfirm(true)}
        >
          X
        </button>
      </div>
    </>
  );
}

export default AdsItem;
