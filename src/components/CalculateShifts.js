import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import GradientButton from "./GradientButton";
import SecondaryButton from "./SecondaryButton";

const CalculateShifts = ({ onNext, onPrev }) => {
  const { data, setData } = useContext(DataContext);
  const [shifts, setShifts] = useState(null);
  const [finalShifts, setFinalShifts] = useState(null);

  useEffect(() => {
    console.log(data, " is the data END END END");
  }, [data]);

  useEffect(() => {
    if (finalShifts) {
      console.log(finalShifts, " is the final product");
      // const parsedShifts = JSON.parse(finalShifts)
      // const daysArray = parsedShifts.properties.days;
    }
  }, [finalShifts]);

  useEffect(() => {
    if (shifts) {
      setData({ ...data, shiftSchedule: shifts });
      onNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shifts]);

  return (
    <Box>
      <SecondaryButton onClick={onPrev}>Previous</SecondaryButton>
      <GradientButton
        onClick={async () => {
          console.log("clicked");
          axios
            .post("http://localhost:3001/make-shifts", data)
            .then((response) => {
              console.log(response, " is the response");
              const responseData = response.data.completion.content;
              const contentObject = JSON.parse(responseData); // Parse the content string into an object
              if (contentObject.properties.days) {
                const daysObject = contentObject.properties.days;
                console.log(daysObject, " is the response we get");
                setShifts(daysObject);
              } else if (contentObject.days) {
                const daysObject = contentObject.days;
                console.log(daysObject, " is the response we get");
                setShifts(daysObject);
              } else {
                throw new Error(
                  "no valid response w/ this content: ",
                  contentObject
                );
              }
            })
            .catch((e) => {
              console.log(e, " is an error");
            });
        }}
      >
        Calculate Shifts!
      </GradientButton>
    </Box>
  );
};

export default CalculateShifts;
