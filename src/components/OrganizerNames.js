import { Box, Button, Textarea } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { DataContext } from "../App";

const OrganizerNames = ({ onNext, onPrev }) => {
  const [names, setNames] = useState("");
  const { data, setData } = useContext(DataContext);

  const updateNames = (val) => {
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

      <Button
        onClick={() => {
          updateNames(names);
          onNext();
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default OrganizerNames;
