type Props = {
  visible: boolean;
};

const Loading = ({ visible }: Props) => {
  return (
    <>
      {visible && (
        <div className="z-50 flex justify-center items-center bg-slate-700 fixed left-0 top-0 h-full w-full bg-opacity-50">
          {/* <LoadingIcon /> */}
        </div>
      )}
    </>
  );
};

export default Loading;
