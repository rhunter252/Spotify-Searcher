import Search from "./components/Search";

function App() {
  return (
    <div className="App flex flex-nowrap flex-col items-center justify-center w-screen h-screen overflow-x-hidden">
      <h1 className="text-stone-900 text-center text-3xl font-bold py-5 mt-20 z-10">
        Spotify Search
      </h1>
      <Search />
    </div>
  );
}

export default App;
