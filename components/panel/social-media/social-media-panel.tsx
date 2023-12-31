"use client";
import FieldHorizontal from "@/components/field/field-horizontal";
import Line from "@/components/line";

import SocialItem from "@/components/panel/social-media/social-item";
import { SocialMedia } from "@/types/social-media";
import { apiAxios } from "@/utils/axios";

import React, { useState } from "react";

type Props = {
  socialMediaData: SocialMedia[];
};

function SocialMediaPanel({ socialMediaData }: Props) {
  const [socialMediaList, setSocialMediaList] = useState(socialMediaData);
  const [tambahSocialMedia, setTambahSocialMedia] = useState<SocialMedia>({
    name: "",
    url: "",
    logoUrl: "",
  });

  const tambahSocialValidation =
    tambahSocialMedia.name != "" &&
    tambahSocialMedia.url != "" &&
    tambahSocialMedia.logoUrl != "";

  const onInputTambahChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setTambahSocialMedia((prev) => {
      return {
        ...prev,
        [key]: e.target.value,
      };
    });
  };

  const onTambahSocialMedia = async () => {
    await apiAxios
      .post(`/social-media/create`, {
        socialMediaData: tambahSocialMedia,
      })
      .then((res) => {
        setSocialMediaList((prevSocial) => {
          if (prevSocial.length > 0) {
            return [...prevSocial, res.data];
          }
          return [res.data];
        });
        return setTambahSocialMedia({
          name: "",
          url: "",
          logoUrl: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col p-2 w-[80%] max-w-[1100px] m-auto bg-tertiary rounded-md">
      <div className="flex flex-row items-center">
        <FieldHorizontal
          value={tambahSocialMedia.name}
          name="Name"
          conf={{ onChange: (e) => onInputTambahChange(e, "name") }}
        />
        <FieldHorizontal
          value={tambahSocialMedia.url}
          name="Url"
          conf={{ onChange: (e) => onInputTambahChange(e, "url") }}
        />
        <FieldHorizontal
          value={tambahSocialMedia.logoUrl}
          name="Logo Url"
          conf={{ onChange: (e) => onInputTambahChange(e, "logoUrl") }}
        />
        <button
          disabled={!tambahSocialValidation}
          className={`ml-2 rounded ${
            tambahSocialValidation ? "bg-[#fff]" : "bg-[#ffffff90]"
          } p-1`}
          onClick={onTambahSocialMedia}
        >
          Tambah
        </button>
      </div>
      <Line thin />
      {socialMediaList?.length > 0 ? (
        <>
          <h3 className="text-center text-2xl">LIST</h3>
          {socialMediaList.map((social, socialIndex) => {
            return (
              <SocialItem
                key={socialIndex}
                setSocialMedia={setSocialMediaList}
                socialIndex={socialIndex}
                socialMedia={social}
              />
            );
          })}
        </>
      ) : (
        <div className="flex flex-1 justify-center items-center text-2xl">
          No Data
        </div>
      )}
    </div>
  );
}

export default SocialMediaPanel;
