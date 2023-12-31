import DeleteConfirm from "@/components/delete-confirm";
import FieldHorizontal from "@/components/field/field-horizontal";
import { Ads } from "@/types/ads";
import { Featured, FeaturedData } from "@/types/featured";
import { Movie } from "@/types/movie";
import { apiAxios } from "@/utils/axios";
import axios from "axios";
import React, { useState } from "react";

type Props = {
  featured: Featured;
  featuredIndex: number;
  setFeaturedData: React.Dispatch<React.SetStateAction<FeaturedData>>;
};

function MovieFeaturedItem({
  featuredIndex,
  featured,
  setFeaturedData,
}: Props) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const onDeleteConfirmClose = () => {
    setDeleteConfirm(false);
  };

  const onDeleteAds = async () => {
    await apiAxios.delete(`/featured/delete`, {
      params: {
        featuredId: featured.id,
      },
    });

    onDeleteConfirmClose();
    setFeaturedData((prev) => {
      const newFeatured = [...prev[featured.type.toLowerCase()]];
      newFeatured.splice(featuredIndex, 1);
      const result = {
        ...prev,
        [featured.type.toLowerCase()]: newFeatured,
      };
      return result;
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
        <FieldHorizontal disabled name="Title" value={featured?.movie?.title} />
        <FieldHorizontal disabled name="Imdb" value={featured?.movie?.imdbId} />
        <button
          className="bg-red-500 w-[7%] min-w-[30px] aspect-square rounded-md"
          onClick={() => setDeleteConfirm(true)}
        >
          X
        </button>
      </div>
    </>
  );
}

export default MovieFeaturedItem;
