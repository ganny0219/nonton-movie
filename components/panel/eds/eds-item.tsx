import DeleteConfirm from "@/components/delete-confirm";
import FieldHorizontal from "@/components/field/field-horizontal";
import { Eds } from "@/types/eds";
import { apiAxios, baseAxios } from "@/utils/axios";
import axios from "axios";
import React, { useState } from "react";

type Props = {
  eds: Eds;
  edsIndex: number;
  setFullEds: React.Dispatch<React.SetStateAction<Eds[]>>;
  setHalfEds: React.Dispatch<React.SetStateAction<Eds[]>>;
};

function EdsItem({ eds, edsIndex, setFullEds, setHalfEds }: Props) {
  const [edit, setEdit] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const onInputEdsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (eds.type == "full") {
      setFullEds((prev) => {
        const newDataEds = [...prev];
        newDataEds[edsIndex] = {
          ...newDataEds[edsIndex],
          [key]: e.target.value,
        };
        return newDataEds;
      });
    } else {
      setHalfEds((prev) => {
        const newDataEds = [...prev];
        newDataEds[edsIndex] = {
          ...newDataEds[edsIndex],
          [key]: e.target.value,
        };
        return newDataEds;
      });
    }
  };

  const editSave = async () => {
    await baseAxios.patch(
      `/eds/update`,
      {
        dataEds: eds,
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

  const onDeleteEds = async () => {
    await apiAxios.delete(`/eds/delete`, {
      params: {
        edsId: eds.id,
      },
    });
    if (eds.type == "full") {
      onDeleteConfirmClose();
      setFullEds((prev) => {
        const newDataEds = [...prev];
        newDataEds.splice(edsIndex, 1);
        return newDataEds;
      });
    } else {
      onDeleteConfirmClose();
      setHalfEds((prev) => {
        const newDataEds = [...prev];
        newDataEds.splice(edsIndex, 1);
        return newDataEds;
      });
    }
  };

  return (
    <>
      <DeleteConfirm
        visible={deleteConfirm}
        onClose={onDeleteConfirmClose}
        onConfirm={onDeleteEds}
      />
      <div className="flex flex-row items-center">
        <FieldHorizontal
          disabled={!edit}
          name="Sequence"
          value={eds.sequence.toString()}
          conf={{ onChange: (e) => onInputEdsChange(e, "sequence") }}
        />
        <FieldHorizontal
          disabled={!edit}
          name="Name"
          value={eds.name}
          conf={{ onChange: (e) => onInputEdsChange(e, "name") }}
        />
        <FieldHorizontal
          disabled={!edit}
          name="Url"
          value={eds.url}
          conf={{ onChange: (e) => onInputEdsChange(e, "url") }}
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

export default EdsItem;
