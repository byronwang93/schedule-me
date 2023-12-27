import { Box, Text, Textarea } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import SecondaryButton from "./SecondaryButton";

const OrganizerNames = ({ onNext, onPrev }) => {
  const [names, setNames] = useState("");
  const { data, setData } = useContext(DataContext);

  const updateNames = () => {
    const namesArray = names.split(",");
    const trimmedArray = namesArray.map((str) => str.trim());

    setData({
      ...data,
      names: trimmedArray,
    });
  };

  return (
    <Box
      w={{ base: "360px", md: "680px" }}
      borderRadius="7px"
      p="30px"
      bgColor="#433860"
      textAlign={"right"}
    >
      <Text pb={"20px"} 
            fontSize={"18px"}
            textAlign={"left"}>
        Input the name of all organizers here (names are separated by commas).
      </Text>
      <Textarea
        height={"140px"}
        textAlign={"left"}
        value={names}
        onChange={(e) => {
          setNames(e.target.value);
        }}
        placeholder="Ex. Kitty, Kashish, Nick, Byron, Nugget, ..."
      />

      <SecondaryButton
        marginTop="20px"
        isDisabled={names===""}
        onClick={() => {
          updateNames(names);
          onNext();
        }}
      >
        Next
      </SecondaryButton>
    </Box>
  );
};

export default OrganizerNames;
