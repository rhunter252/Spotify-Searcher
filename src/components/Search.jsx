import React, { useState, useEffect } from "react";
import Card from "./Card";

const CLIENT_ID = "a3c7d448f35e47a38fb55cce57d0a151";
const CLIENT_SECRET = "0e5f3aa7e03e4969b7e00057477fb8a2";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  // Search function
  async function search() {
    console.log("Search for " + searchInput);
    // Get request using search to get the Artist ID
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    let artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    console.log(artistID);
    // Get request with Artist ID grab all the albums from that artist
    let returnedAlbums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album&market=US&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbums(data.items);
      });

    //   Display albums to user
    console.log(albums);
  }

  return (
    <>
      <div className="container flex justify-center">
        <input
          type="input"
          placeholder="Search"
          onKeyPress={(e) => {
            if (e.code === "Enter") {
              search();
            }
          }}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border-2 border-black"
        />
        <button
          onClick={search}
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </div>
      <div className="container">
        <div className="content-center md:px-10 xl:px-40 py-12">
          <div className="mt-8 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
            {albums.map((album, i) => {
              return (
                <div className="rounded-lg shadow-lg bg-white max-w-sm">
                  <a href="#!">
                    <img
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
                    <button
                      type="button"
                      className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Button
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;
