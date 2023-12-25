import ErrorIcon from "@/assets/icons/error-icon";
import SuccesIcon from "@/assets/icons/succes-icon";
import Field from "@/components/field/field";
import FieldHorizontal from "@/components/field/field-horizontal";
import Loading from "@/components/loading";
import RadioButton from "@/components/radio-button/radio-button";
import RadioButtonArray from "@/components/radio-button/radio-button-array";
import { RootState } from "@/store";
import { updateMovieData } from "@/store/movie";
import { GoogleGenereateResult } from "@/types/player-server";
import { apiAxios } from "@/utils/axios";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  visible: boolean;
  update?: boolean;
  movieTitle: string;
  imdbId: string;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  movieType: string;
};

const GoogleGenerateMovieModal = ({
  imdbId,
  movieTitle,
  visible,
  onClose,
  update,
  movieType,
}: Props) => {
  const movieData = useSelector((state: RootState) => state.movie);
  const [googleUrl, setGoogleUrl] = useState("");
  const [selectedServer, setSelectedServer] = useState({
    playerx: true,
    abyss: true,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onCloseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose(e);
  };

  const onGoogleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoogleUrl(e.target.value);
  };
  const generateGoolgeSlug = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (googleUrl == "") {
      return alert("Isi Google URL");
    }
    if (
      !googleUrl.includes("https://drive.google.com/file/d/") &&
      !googleUrl.includes("/view?usp=drive_link")
    ) {
      return alert("Format URL Salah!");
    }
    const googleId = googleUrl
      .replace("https://drive.google.com/file/d/", "")
      .replace("/view?usp=drive_link", "");
    setLoading(true);
    await apiAxios
      .post(`/player/generate-google-slug`, {
        googleId: googleId,
        selectedServer: selectedServer,
        playerList: movieData.playerUrl,
        imdbId: imdbId,
        movieTitle: movieTitle,
        update: update,
        movieType: movieType,
      })
      .then((res) => {
        const newPlayerUrl = [];
        const generatedSlug: GoogleGenereateResult = res.data;
        for (let player of movieData.playerUrl) {
          if (
            player.name == "Abyss" &&
            selectedServer.abyss &&
            generatedSlug.abyss
          ) {
            newPlayerUrl.push({
              ...player,
              url: generatedSlug.abyss,
            });
          } else if (
            player.name == "Playerx" &&
            selectedServer.playerx &&
            generatedSlug.playerx
          ) {
            newPlayerUrl.push({
              ...player,
              url: generatedSlug.playerx,
            });
          } else {
            newPlayerUrl.push({
              ...player,
            });
          }
        }
        setLoading(false);
        onClose(e);
        dispatch(updateMovieData({ playerUrl: newPlayerUrl }));
      })
      .catch((error) => {
        setLoading(false);
        return alert("Terjadi kesalahan pada system!");
      });
  };
  const onRadioChange = (e: React.MouseEvent<HTMLInputElement>) => {
    const key = e.currentTarget.value;
    setSelectedServer((prev) => {
      return {
        ...prev,
        //@ts-ignore
        [key]: !prev[key],
      };
    });
  };
  return (
    <>
      <Loading visible={loading} />
      {visible && (
        <div className="flex justify-center items-center bg-slate-700 fixed left-0 top-0 h-full w-full bg-opacity-50">
          <div className="flex flex-col  min-w-[15rem] w-full max-w-[600px] bg-white rounded p-2">
            <button
              className="flex flex-1 justify-end"
              onClick={onCloseHandler}
            >
              <p className="mr-2 text-xl">X</p>
            </button>
            <h3 className="text-xl">Generate Google</h3>
            <div className="bg-tertiary flex flex-col justify-center p-2 mt-2 rounded">
              <Field
                name="Google Url"
                placeholder="https://drive.google.com/file/d/xxxx/view?usp=drive_link"
                conf={{ onChange: onGoogleSlugChange }}
              />
              <div className="flex mt-4 flex-row justify-around">
                <RadioButtonArray
                  name="Abyss"
                  label="Abyss"
                  onClick={onRadioChange}
                  value="abyss"
                  currentValue={selectedServer.abyss ? "abyss" : ""}
                />
                <RadioButtonArray
                  name="Playerx"
                  label="Playerx"
                  onClick={onRadioChange}
                  value="playerx"
                  currentValue={selectedServer.playerx ? "playerx" : ""}
                />
              </div>
            </div>
            <button
              className="my-4 bg-secondary rounded py-1"
              onClick={generateGoolgeSlug}
            >
              Generate
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleGenerateMovieModal;
