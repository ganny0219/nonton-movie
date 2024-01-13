import React from "react";

function MovieHeaderTable() {
  return (
    <div className="flex flex-row w-full text-xl bg-tertiary">
      <div className="flex items-center py-2 w-[20%] border-solid border-[1px] border-black pl-2">
        Imdb Id
      </div>
      <div className="flex items-center py-2 flex-1 border-solid border-[1px] border-l-0 border-black pl-2">
        Title
      </div>
      <div className="flex items-center py-2 flex-1 border-solid border-[1px] border-l-0 border-black pl-2">
        Original Title
      </div>
      <div className="flex justify-center py-2 items-center w-[20%] border-solid border-[1px] border-l-0 border-black pl-2">
        Action
      </div>
    </div>
  );
}

export default MovieHeaderTable;
