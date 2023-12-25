import ErrorIcon from "@/assets/icons/error-icon";
import SuccesIcon from "@/assets/icons/succes-icon";

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteConfirm = ({ visible, onClose, onConfirm }: Props) => {
  const onCloseHandler = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    onClose(false);
  };

  const onConfirmHandler = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    onConfirm();
  };
  return (
    <>
      {visible && (
        <div className="flex justify-center items-center bg-slate-700 fixed left-0 top-0 h-full w-full bg-opacity-50">
          <div className="flex flex-col  min-w-[15rem]  bg-white rounded p-2">
            <button
              className="flex flex-1 justify-end"
              onClick={onCloseHandler}
            >
              <p className="mr-2 text-xl">X</p>
            </button>
            <p className="text-xl my-2">ARE YOU SURE TO DELETE THIS?</p>
            <button
              className="bg-red-100 p-2 rounded"
              onClick={onConfirmHandler}
            >
              DELETE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteConfirm;
