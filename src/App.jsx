import { motion } from "framer-motion";
import Search from "./components/Search";

function App() {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      exit={{ opacity: 0, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="App flex flex-nowrap flex-col items-center justify-center w-screen h-screen overflow-x-hidden">
        <h1 className="text-stone-900 text-center text-3xl font-bold py-5 mt-20 z-10">
          Search for your favorite artists on Spotify!
        </h1>
        <Search />
      </div>
    </motion.div>
  );
}

export default App;
