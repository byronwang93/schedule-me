import { Box, Button } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { DataContext } from "../App";

const Shifts = ({ onPrev, onNext }) => {
  const { data, setData } = useContext(DataContext);

  useEffect(() => {
    console.log(data, " is the data");
  }, [data]);
  return (
    <Box>
      <Button onClick={onPrev}>Previous</Button>
      <Button
        onClick={() => {
          onNext();
        }}
      >
        Continue
      </Button>
    </Box>
  );
};

export default Shifts;
