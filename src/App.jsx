import { useState, useEffect } from "react";
import Search from "./components/Search";

function App() {
  return (
    <div className="App flex flex-wrap flex-col justify-center bg-gradient-to-b from-slate-300 to-slate-900">
      <h1 className="text-center text-3xl font-bold py-5">Spotify Search</h1>
      <Search />
    </div>
  );
}

export default App;
