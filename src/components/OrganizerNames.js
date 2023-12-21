import { Box, Textarea } from "@chakra-ui/react";
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
    <Box>
      <Textarea
        value={names}
        onChange={(e) => {
          setNames(e.target.value);
        }}
        placeholder="names of all organizers goes here"
      />

      <SecondaryButton
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
