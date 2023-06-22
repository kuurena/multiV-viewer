import React from "react";

function AnimeSearchPage() {
  return (
    <div className="fixed z-10 flex h-screen w-screen items-center justify-center bg-purple-800">
      <div className="h-[80%] w-[80%] bg-purple-400">
        <div>
          <input type="text" />
          <button></button>
        </div>
        <div className="flex flex-wrap">
          <animeCard />
        </div>
      </div>
    </div>
  );
}

export default AnimeSearchPage;
