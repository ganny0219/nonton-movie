import FieldHorizontal from "@/components/field/field-horizontal";
import Loading from "@/components/loading";
import RadioButton from "@/components/radio-button/radio-button";
import RadioButtonArray from "@/components/radio-button/radio-button-array";
import { RootState } from "@/store";
import {
  updateAllEpisodeData,
  updateEpisodeData,
  updateMovieData,
} from "@/store/movie";
import { Episode, EpisodePlayerList, Season } from "@/types/movie";
import { GoogleGenereateData, PlayerServer } from "@/types/player-server";
import { apiAxios } from "@/utils/axios";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  visible: boolean;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  update?: boolean;
  seasonIndex: number;
  movieTitle: string;
  imdbId: string;
  season: number;
  movieType: string;
};

const GoogleGenerateEpisodeModal = ({
  seasonIndex,
  visible,
  onClose,
  update,
  movieTitle,
  imdbId,
  season,
  movieType,
}: Props) => {
  const [googleGenerateData, setGoogleGenerateData] = useState<
    GoogleGenereateData[]
  >([]);
  const movieData = useSelector((state: RootState) => state.movie);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (movieData.season[seasonIndex] && seasonIndex >= 0) {
      const googleData = [];
      for (let episode of movieData.season[seasonIndex]?.episode) {
        googleData.push({
          episode: {
            ...episode,
          },
          googleId: "",
          playerx: true,
          abyss: true,
        });
      }
      setGoogleGenerateData(googleData);
    }
  }, [movieData.season, season]);
  const onGoogleIdChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    googleDataIndex: number
  ) => {
    setGoogleGenerateData((prev) => {
      let newData = [...prev];
      newData[googleDataIndex] = {
        ...newData[googleDataIndex],
        googleId: e.target.value,
      };
      return newData;
    });
  };
  const onRadioChange = (
    e: React.MouseEvent<HTMLInputElement>,
    googleDataIndex: number,
    key: string
  ) => {
    setGoogleGenerateData((prev) => {
      let newData = [...prev];
      newData[googleDataIndex] = {
        ...newData[googleDataIndex],
        [key]: !newData[googleDataIndex][key],
      };
      return newData;
    });
  };

  const allRadioHandler = (key: string) => {
    setGoogleGenerateData((prevData) => {
      const newData: GoogleGenereateData[] = [];
      for (let googleData of prevData) {
        newData.push({
          ...googleData,
          [key]: !googleData[key],
        });
      }
      return newData;
    });
  };
  const onGenerateGoogleData = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    for (let googleData of googleGenerateData) {
      if (
        googleData.googleId != "" &&
        (!googleData.googleId.includes("https://drive.google.com/file/d/") ||
          !googleData.googleId.includes("/view?usp=drive_link"))
      ) {
        return alert("Format Google Id Tidak Benar!");
      }
    }
    setLoading(true);
    await apiAxios
      .post(`/player/generate-google-episode-slug`, {
        googleGenerateData: googleGenerateData,
        update: update,
        movieTitle: movieTitle,
        imdbId: imdbId,
        season: season,
        movieType: movieType,
      })
      .then((res) => {
        setLoading(false);
        onClose(e);
        dispatch(updateAllEpisodeData({ episodeData: res.data, seasonIndex }));
      })
      .catch((error) => {
        setLoading(false);
        return alert("Terjadi kesalahan pada system!");
      });
  };
  return (
    <>
      <Loading visible={loading} />
      {visible && (
        <div className="z-10 flex justify-center items-center bg-slate-700 fixed left-0 top-0 h-full w-full bg-opacity-50">
          <div className="bg-[#fff] rounded-md max-h-[80vh] overflow-auto p-6 text-center">
            <div className="flex flex-1 justify-end">
              <button
                onClick={(e) => {
                  onClose(e);
                }}
              >
                X
              </button>
            </div>
            <h2 className="text-2xl text-start mb-4">Generate Google Id</h2>
            <div className="flex flex-row justify-around">
              <button
                className="bg-tertiary p-2 rounded"
                onClick={() => allRadioHandler("playerx")}
              >
                Check All Playerx
              </button>
              <button
                className="bg-tertiary p-2 rounded"
                onClick={() => allRadioHandler("abyss")}
              >
                Check All Abyss
              </button>
            </div>
            {googleGenerateData.map((googleData, googleDataIndex) => {
              return (
                <div
                  key={googleDataIndex}
                  className="flex flex-row rounded pr-2 items-center bg-tertiary my-2"
                >
                  <div>
                    <FieldHorizontal
                      unedit
                      name="Episode"
                      value={googleData?.episode?.sequence?.toString()}
                    />
                  </div>
                  <FieldHorizontal
                    placeholder="https://drive.google.com/file/d/xxxx/view?usp=drive_link"
                    name="Google Id"
                    conf={{
                      onChange: (e) => {
                        onGoogleIdChange(e, googleDataIndex);
                      },
                    }}
                  />
                  <div className="flex flex-row justify">
                    <div className="mr-2">
                      <RadioButtonArray
                        name={"Abyss" + googleData?.episode?.sequence}
                        label="Abyss"
                        onClick={(e) =>
                          onRadioChange(e, googleDataIndex, "abyss")
                        }
                        value="abyss"
                        currentValue={googleData.abyss ? "abyss" : ""}
                      />
                    </div>
                    <RadioButtonArray
                      name={"Playerx" + googleData?.episode?.sequence}
                      label="Playerx"
                      onClick={(e) =>
                        onRadioChange(e, googleDataIndex, "playerx")
                      }
                      value="playerx"
                      currentValue={googleData.playerx ? "playerx" : ""}
                    />
                  </div>
                </div>
              );
            })}
            <button
              className="bg-secondary p-2 w-full rounded"
              onClick={onGenerateGoogleData}
            >
              GENERATE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleGenerateEpisodeModal;
