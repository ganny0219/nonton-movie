import ErrorIcon from "@/assets/icons/error-icon";
import SuccesIcon from "@/assets/icons/succes-icon";
import Field from "@/components/field/field";
import Line from "@/components/line";
import { GoogleDrive } from "@/types/google-drive";
import { apiAxios } from "@/utils/axios";
import { useState } from "react";

type Props = {
  gdrive: GoogleDrive;
  visible: boolean;
  setGdriveList: React.Dispatch<React.SetStateAction<GoogleDrive[]>>;
  onClose: () => void;
  gdriveIndex: number;
};

const GDriveUpdateModal = ({
  visible,
  onClose,
  setGdriveList,
  gdrive,
  gdriveIndex,
}: Props) => {
  const [updateData, setUpdateData] = useState<GoogleDrive>(gdrive);
  const onCloseHandler = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    onClose();
  };

  const onDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setUpdateData((prev) => {
      return {
        ...prev,
        [key]: e.target.value,
      };
    });
  };

  const onUpdate = async () => {
    await apiAxios
      .patch(`/google-drive/update`, {
        googleDriveData: updateData,
      })
      .then((res) => {
        setGdriveList((prev) => {
          let newData = [...prev];
          newData[gdriveIndex] = res.data;
          return newData;
        });
        onClose();
      })
      .catch((err) => {
        return alert("Terjadi Kesalahan Pada System!");
      });
  };

  return (
    <>
      {visible && (
        <div className="flex justify-center items-center bg-slate-700 fixed left-0 top-0 h-full w-full bg-opacity-50">
          <div className="flex flex-col min-w-[15rem] w-[90%] max-w-[900px] bg-tertiary rounded p-2">
            <button
              className="flex flex-1 justify-end"
              onClick={onCloseHandler}
            >
              <p className="mr-2 text-xl">X</p>
            </button>
            <h3 className="text-2xl mb-2">Update Google Drive</h3>
            <Line thin />
            <Field
              name="Google ID"
              value={updateData.googleId}
              conf={{ onChange: (e) => onDataChange(e, "googleId") }}
            />
            <Field
              name="Imdbd ID"
              value={updateData.imdbId}
              conf={{ onChange: (e) => onDataChange(e, "imdbId") }}
            />
            <Field
              name="Title"
              value={updateData.movieTitle}
              conf={{ onChange: (e) => onDataChange(e, "movieTitle") }}
            />
            <Field
              name="Season"
              value={updateData.season.toString()}
              conf={{ onChange: (e) => onDataChange(e, "season") }}
            />
            <Field
              name="Episode"
              value={updateData.episode.toString()}
              conf={{ onChange: (e) => onDataChange(e, "episode") }}
            />
            <button
              className="mt-6 shadow-lg bg-[#fff] rounded py-2"
              onClick={onUpdate}
            >
              UPDATE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GDriveUpdateModal;
