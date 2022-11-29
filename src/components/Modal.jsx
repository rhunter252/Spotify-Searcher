import React from "react";

const Modal = ({ modal, image, albumName, date, tracks, artistName, id }) => {
  if (!modal) return null;
  return (
    <div
      className={
        modal
          ? "fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-neutral-900/50"
          : "hidden"
      }
    >
      <div className="flex w-5/6 flex-col rounded-lg sm:flex-row lg:w-2/3 2xl:max-w-[1050px]">
        <div id="album-modal-left" className="w-full sm:w-3/5">
          <img
            src={image}
            alt="/"
            className="rounded-t-lg sm:rounded-r-none sm:rounded-l-lg"
          />
        </div>
        <div
          id="album-modal-right"
          className="flex w-full flex-col justify-between rounded-b-lg bg-neutral-800 p-[5%] text-white sm:w-2/5 sm:rounded-r-lg sm:rounded-l-none"
        >
          <div>
            <h3 className="text-2xl ">{artistName}</h3>
            <p className=" text-neutral-200">{date}</p>
            <button className="mt-2 mb-2 w-[90px] rounded bg-green-600 px-2 py-1 text-white shadow-sm shadow-neutral-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-neutral-700 sm:mb-0 sm:mt-4">
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://open.spotify.com/album/${id}`}
                className="flex w-full items-center justify-between"
              >
                Open{" "}
                <img
                  src={"https://www.svgrepo.com/show/355256/spotify.svg"}
                  alt="Spotify logo"
                  className="h-6"
                />
              </a>
            </button>
          </div>

          <div>
            <div className="flex flex-col">
              <p className=" m-[1px] flex w-fit whitespace-normal rounded bg-black px-2 py-1 text-sm text-white">
                {albumName}
              </p>
            </div>
            <p className="bottom-0 mt-2 text-neutral-200">{tracks} tracks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
