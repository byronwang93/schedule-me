import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

const CalculateShifts = ({ onNext, onPrev }) => {
  const { data, setData } = useContext(DataContext);
  const [finalShifts, setFinalShifts] = useState(null);

  useEffect(() => {
    console.log(data, " is the data END END END");
  }, [data]);
  return (
    <Box>
      <Button onClick={onPrev}>Previous</Button>
      <Button
        onClick={async () => {
          console.log("clicked");
          axios
            .post("http://localhost:3001/make-shifts", data)
            .then((response) => {
              console.log(response, " is the response we get");
            })
            .catch((e) => {
              console.log(e, " is an error");
            });

          //   onNext();
        }}
      >
        Calculate Shifts!
      </Button>
    </Box>
  );
};

export default CalculateShifts;
