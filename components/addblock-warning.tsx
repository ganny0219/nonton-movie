type Props = {
  visible: boolean;
  onClose: () => void;
};

const EdsBlockWarning = ({ visible, onClose }: Props) => {
  return (
    <>
      {visible && (
        <div className="z-10 flex justify-center items-center bg-slate-700 fixed left-0 top-0 h-full w-full bg-opacity-50">
          <div className="bg-[#fff] rounded-md p-6 text-center">
            <div className="text-4xl mb-6">Tolong Matikan Ads Block ^^ </div>
            <button
              onClick={onClose}
              className="bg-secondary rounded px-2 py-1"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EdsBlockWarning;
