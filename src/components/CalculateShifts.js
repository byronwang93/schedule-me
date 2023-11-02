import { Box, Button } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

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
  }, [shifts]);
  // useEffect(() => {
  //   if (shifts) {
  //     // const moreData = {
  //     //   originalData: data,
  //     //   shifts: shifts,
  //     // };
  //     // const getUniqueData = async () => {
  //     //   axios
  //     //     .post("http://localhost:3001/retrieve-personal-info", moreData)
  //     //     .then((response) => {
  //     //       const parsedShifts = JSON.parse(response.data.completion.content);
  //     //       const uniqueObject = parsedShifts.properties.names;
  //     //       setFinalShifts({
  //     //         names: uniqueObject,
  //     //         days: shifts,
  //     //       });
  //     //     })
  //     //     .catch((e) => {
  //     //       console.log(e, " is an error");
  //     //     });
  //     // };
  //     // getUniqueData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [shifts]);

  return (
    <Box>
      <Button onClick={onPrev}>Previous</Button>
      <Button
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

              // const pattern = /"days": \[.*?\]/;
              // const match = responseData.match(pattern);
              // console.log(match, " is the match");
              // if (match) {
              //   const daysObjectMatch = match[0];
              //   const parsedShifts = JSON.parse(`{${daysObjectMatch}}`).days;
              //   // const daysObject = parsedShifts.properties.days;
              //   console.log(parsedShifts, " is the response we get");
              //   setShifts(parsedShifts);
              // } else {
              //   throw new Error("not a valid response");
              // }
            })
            .catch((e) => {
              console.log(e, " is an error");
            });

          // onNext();
        }}
      >
        Calculate Shifts!
      </Button>
    </Box>
  );
};

export default CalculateShifts;
