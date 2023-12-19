import "./App.css";
import { VStack } from "@chakra-ui/react";
import Header from "./components/Header";
import { createContext, useState } from "react";
import AppContext from "./components/AppContext";
import FontLoader from "./components/FontLoader";

export const DataContext = createContext();

function App() {
  const [data, setData] = useState({});

  return (
    <DataContext.Provider value={{ data, setData }}>
      <FontLoader fonts={["Hanken Grotesk:400,700"]}>
        <VStack
          bgColor="#433860"
          justifyContent="center"
          minH="100vh"
          height="fit-content"
        >
          <Header />
          <AppContext />
        </VStack>
      </FontLoader>
    </DataContext.Provider>
  );
}

export default App;
