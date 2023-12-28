import ProfileIcon from "@/assets/icons/profile-icon";
import React from "react";

function HeaderPanel() {
  return (
    <div className="flex flex-row justify-between items-center px-6 py-4 w-full shadow-md">
      <h1>Moovie21 Panel</h1>
      <button>
        <ProfileIcon size="1.5" />
      </button>
    </div>
  );
}

export default HeaderPanel;
