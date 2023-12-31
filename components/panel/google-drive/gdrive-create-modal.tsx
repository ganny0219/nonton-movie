import ErrorIcon from "@/assets/icons/error-icon";
import SuccesIcon from "@/assets/icons/succes-icon";
import Field from "@/components/field/field";
import Line from "@/components/line";
import { GoogleDrive } from "@/types/google-drive";
import { apiAxios } from "@/utils/axios";
import { useState } from "react";

type Props = {
  visible: boolean;
  setGdriveList: React.Dispatch<React.SetStateAction<GoogleDrive[]>>;
  onClose: () => void;
};

const GDriveCreateModal = ({ visible, onClose, setGdriveList }: Props) => {
  const [createData, setCreateData] = useState<GoogleDrive>({
    googleId: "",
    episode: 0,
    imdbId: "",
    movieTitle: "",
    season: 0,
    movieType: "",
  });
  const onCloseHandler = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    onClose();
  };

  const onDataChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setCreateData((prev) => {
      return {
        ...prev,
        [key]: e.target.value,
      };
    });
  };

  const onUpdate = async () => {
    await apiAxios
      .post(`/google-drive/insert`, {
        googleDriveData: createData,
      })
      .then((res) => {
        setGdriveList((prev) => {
          return [res.data, ...prev];
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
            <h3 className="text-2xl mb-2">Create Google Drive</h3>
            <Line thin />
            <Field
              name="Google ID"
              value={createData.googleId}
              conf={{ onChange: (e) => onDataChange(e, "googleId") }}
            />
            <Field
              name="Imdbd ID"
              value={createData.imdbId}
              conf={{ onChange: (e) => onDataChange(e, "imdbId") }}
            />
            <Field
              name="Title"
              value={createData.movieTitle}
              conf={{ onChange: (e) => onDataChange(e, "movieTitle") }}
            />
            <Field
              name="Season"
              value={createData.season.toString()}
              conf={{ onChange: (e) => onDataChange(e, "season") }}
            />
            <Field
              name="Episode"
              value={createData.episode.toString()}
              conf={{ onChange: (e) => onDataChange(e, "episode") }}
            />
            <button
              className="mt-6 shadow-lg bg-[#fff] rounded py-2"
              onClick={onUpdate}
            >
              CREATE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GDriveCreateModal;
