import "./App.css";
import { VStack } from "@chakra-ui/react";
import Homescreen from "./components/Homescreen";
import Header from "./components/Header";
import { createContext, useState } from "react";
import AppContext from "./components/AppContext";

export const DataContext = createContext();

function App() {
  const [data, setData] = useState({});

  return (
    <DataContext.Provider value={{ data, setData }}>
      <VStack
        bgColor="#2C2543"
        justifyContent="center"
        minH="100vh"
        height="fit-content"
      >
        {/* <Homescreen /> */}
        <Header />
        <AppContext />
      </VStack>
    </DataContext.Provider>
  );
}

export default App;
