import "./App.css";
import { Center, VStack } from "@chakra-ui/react";
import Homescreen from "./components/Homescreen";
import LandingPage from "./components/LandingPage";
import Header from "./components/Header";
import InputOrganizers from "./components/InputOrganizers";

function App() {
  return (
    <VStack bgColor="#2C2543" justifyContent="center" height="100vh"> 
      {/* <Homescreen /> */}
      <Header />
      {/* <LandingPage /> */}
      <InputOrganizers />
    </VStack>
  );
}

export default App;
