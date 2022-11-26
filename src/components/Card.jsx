import React from "react";

const Card = ({ album, i }) => {
  return (
    <div className="mx-auto mt-8 grid w-4/5 grid-cols-2 lg:grid-cols-3 lg:w-2/3 md:grid-cols-2 sm:grid-cols-1 gap-4">
      {albums.map((album, i) => {
        return (
          <div className="rounded-lg shadow-lg bg-white max-w-sm shadow-black transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg hover:shadow-neutral-700">
            <a href="#!">
              <img
                key={album.id}
                className="rounded-t-lg"
                src={album.images[0].url}
                alt="album-image"
              />
            </a>
            <div className="p-6">
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                {album.name}
              </h5>
              <p className="text-gray-700 text-base mb-4">
                {album.release_date.slice(0, 4)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
