import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const CLIENT_ID = "a3c7d448f35e47a38fb55cce57d0a151";
const CLIENT_SECRET = "0e5f3aa7e03e4969b7e00057477fb8a2";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(null);

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
    // Get request using search to get the Artist ID
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    // Get ArtistID
    let artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    // Get Artist
    const returnedartist = await fetch(
      `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        //artist is an OBJECT
        //here, artist is set to the 0 index of an array of objects
        setArtists(data.artists.items[0]);
        artistID = data.artists.items[0].id;

        console.log(data);
      });
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

    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center mx-auto">
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            onKeyPress={(e) => {
              if (e.code === "Enter") {
                search();
              }
            }}
            onChange={(e) => setSearchInput(e.target.value)}
            className="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-black focus:bg-white focus:text-gray-900 w-60"
            placeholder="Search..."
            autoComplete="off"
          />
        </div>
      </div>

      <div className="container">
        <div className="md:px-15 xl:px-40 py-12">
          <div className="mx-auto w-4/5 pb-4 lg:w-2/3">
            {loading ? null : (
              <div className="flex flex-col justify-between rounded-lg bg-neutral-800 shadow-md shadow-black transition-all duration-300 sm:h-96 sm:flex-row xl:h-[min] 2xl:h-[50vh]">
                <div>
                  <img
                    key={artists.id}
                    src={artists.images[0].url}
                    alt="artist-image"
                    className="w-full rounded-l-lg sm:h-96 sm:rounded-l-lg lg:rounded-l-lg sm:rounded-bl-none xl:h-[min] 2xl:h-[50vh]"
                  />
                </div>
                <div className="flex flex-col text-white mt-6 mx-auto">
                  <p className="text-4xl">{artists.name}</p>
                  <p className="mt-1">
                    {artists.followers.total
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    Followers
                  </p>
                  <button className="w-[90px] rounded bg-green-600 px-2 py-1 text-white shadow-sm shadow-neutral-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-neutral-700 mt-4">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={`https://open.spotify.com/artist/${artists.id}`}
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
                  <div className="mt-4 flex w-full flex-col">
                    {artists.genres.slice(0, 3).map((genre) => {
                      return (
                        <p className="m-[1px] flex w-min whitespace-nowrap rounded bg-black px-2 py-1 text-sm text-white mb-2">
                          {genre}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mx-auto mt-8 grid w-4/5 grid-cols-2 lg:grid-cols-3 lg:w-2/3 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {albums.map((album, i) => {
              return (
                <div
                  className="rounded-lg shadow-lg bg-white max-w-sm shadow-black transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg hover:shadow-neutral-700"
                  key={i}
                >
                  <a
                    href="#!"
                    onClick={() => {
                      setModalData(album);
                      setModal(true);
                    }}
                  >
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
            {loading ? null : (
              <div onClick={() => setModal(false)}>
                <Modal
                  key={modalData?.id}
                  modal={modal}
                  artistName={modalData?.artists[0].name}
                  image={modalData?.images[0].url}
                  albumName={modalData?.name}
                  date={modalData?.release_date}
                  tracks={modalData?.total_tracks}
                  id={modalData?.id}
                ></Modal>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
