import ErrorIcon from "@/assets/icons/error-icon";
import SuccesIcon from "@/assets/icons/succes-icon";
import { AlertProps } from "@/types/global";

type Props = {
  alert: AlertProps;
  customOnPress?: () => void;
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
};

const Alert = ({ alert, setAlert, customOnPress }: Props) => {
  const closeAlertHandler = () => {
    setAlert({
      message: "",
      error: false,
      visible: false,
    });
  };
  return (
    <>
      {alert.visible && (
        <div className="flex justify-center items-center bg-slate-700 fixed left-0 top-0 h-full w-full bg-opacity-50">
          <div className="flex flex-col justify-center items-center min-w-[15rem]  bg-white rounded p-2">
            {alert.error ? <ErrorIcon size="6" /> : <SuccesIcon size="6" />}
            <p>{alert.message}</p>
            <div
              className={`cursor-pointer py-1 px-4 my-2 rounded ${
                alert.error ? "bg-error" : "bg-success"
              }`}
              onClick={customOnPress ? customOnPress : closeAlertHandler}
            >
              <p>{alert.error ? "Try Again" : "OK"}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
