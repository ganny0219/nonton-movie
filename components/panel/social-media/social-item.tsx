import DeleteConfirm from "@/components/delete-confirm";
import FieldHorizontal from "@/components/field/field-horizontal";
import { Ads } from "@/types/ads";
import { SocialMedia } from "@/types/social-media";
import { apiAxios } from "@/utils/axios";
import axios from "axios";
import React, { useState } from "react";

type Props = {
  socialMedia: SocialMedia;
  socialIndex: number;
  setSocialMedia: React.Dispatch<React.SetStateAction<SocialMedia[]>>;
};

function SocialItem({ socialMedia, socialIndex, setSocialMedia }: Props) {
  const [edit, setEdit] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const onInputSocialChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setSocialMedia((prev) => {
      const newSocialMedia = [...prev];
      newSocialMedia[socialIndex] = {
        ...newSocialMedia[socialIndex],
        [key]: e.target.value,
      };
      return newSocialMedia;
    });
  };

  const editSave = async () => {
    await apiAxios.patch(`/social-media/update`, {
      socialMediaData: socialMedia,
    });

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
    await apiAxios.delete(`/social-media/delete`, {
      params: {
        socialMediaId: socialMedia.id,
      },
    });
    onDeleteConfirmClose();
    setSocialMedia((prev) => {
      const newSocialMedia = [...prev];
      newSocialMedia.splice(socialIndex, 1);
      return newSocialMedia;
    });
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
          name="Name"
          value={socialMedia.name}
          conf={{ onChange: (e) => onInputSocialChange(e, "name") }}
        />
        <FieldHorizontal
          disabled={!edit}
          name="Url"
          value={socialMedia.url}
          conf={{ onChange: (e) => onInputSocialChange(e, "url") }}
        />
        <FieldHorizontal
          disabled={!edit}
          name="Logo Url"
          value={socialMedia.logoUrl}
          conf={{ onChange: (e) => onInputSocialChange(e, "logoUrl") }}
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

export default SocialItem;
