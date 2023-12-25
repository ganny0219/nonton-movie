import { updateMovieData } from "@/store/movie";
import React from "react";
import { useDispatch } from "react-redux";

type RadioType = {
  name: string;
  label: string;
  disabled?: boolean;
  value: string;
};

type Props = {
  radioList: RadioType[];
  currentValue: string;
};

function SingleSelectionRadio({ radioList, currentValue }: Props) {
  const dispatch = useDispatch();

  const onRadioChange = (
    e: React.MouseEvent<HTMLInputElement>,
    key: string
  ) => {
    dispatch(updateMovieData({ [key]: e.currentTarget.value }));
  };

  return (
    <>
      {radioList.map((data, index) => {
        return (
          <div key={index} className="flex flex-row items-center">
            <input
              id={data.label}
              disabled={data.disabled ? data.disabled : undefined}
              type="radio"
              defaultChecked={currentValue == data.value}
              name={data.name}
              value={data.value}
              onClick={(e) => onRadioChange(e, data.name)}
            />
            <label className="ml-2" htmlFor={data.label}>
              {data.label}
            </label>
          </div>
        );
      })}
    </>
  );
}

export default SingleSelectionRadio;
