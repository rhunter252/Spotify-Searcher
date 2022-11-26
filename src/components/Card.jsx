import React from "react";

const Card = ({ album, i }) => {
  return (
    <div className="container">
      <div className="content-center md:px-10 xl:px-40 py-12">
        <div className="mt-8 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
          <div className="rounded-lg shadow-lg bg-white max-w-sm">
            <a href="#!">
              <img className="rounded-t-lg" src={null} alt="album-image" />
            </a>
            <div className="p-6">
              <h5 className="text-gray-900 text-xl font-medium mb-2">
                {album.name}
              </h5>
              <p className="text-gray-700 text-base mb-4">
                {album.release_date}
              </p>
              <button
                type="button"
                className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              >
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
