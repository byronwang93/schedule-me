import { Box, Button, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

const UnavailableTable = ({ onNext, onPrev }) => {
  const { data, setData } = useContext(DataContext);

  const [startEndTimes, setStartEndTimes] = useState(null);
  const [increment, setIncrement] = useState(null);
  const [unavailabilities, setUnavailabilities] = useState({});

  useEffect(() => {
    setIncrement(data?.increments);
    setStartEndTimes(data?.startEndTimes);
  }, [data]);

  useEffect(() => {
    console.log(data, " is the data in the END");
    console.log(startEndTimes, " is STARTEND");
    console.log(increment, " is increment");
  }, [data, startEndTimes, increment]);

  function addHours(time, hours) {
    const [hoursPart, minutesPart] = time.split(":").map(Number);
    const totalMinutes = hoursPart * 60 + minutesPart + hours * 60;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(
      2,
      "0"
    )}`;
  }

  useEffect(() => {
    if (data?.daysList && startEndTimes) {
      const daysList = data?.daysList;
      for (let i = 0; i < daysList.length; i++) {
        const curr = daysList[i];
        console.log(curr, " is the curr");
        console.log(unavailabilities, " is the THING");
        if (!unavailabilities[curr]) {
          const start = startEndTimes[curr]?.start;
          const end = startEndTimes[curr]?.end;
          const unavailIntervals = [];

          let currentStart = start;

          while (currentStart < end) {
            const currentEnd = addHours(currentStart, increment);
            unavailIntervals.push({
              start: currentStart,
              end: currentEnd > end ? end : currentEnd,
              unavailable: [],
            });
            currentStart = currentEnd;
          }

          console.log(start, end, " is the OOGABOOGA");
          setUnavailabilities({
            ...unavailabilities,
            [curr]: unavailIntervals,
          });
        }
      }
    }
  }, [data, startEndTimes, unavailabilities]);

  useEffect(() => {
    console.log(unavailabilities, " is UNAVAIL");
  }, [unavailabilities]);
  // useEffect(() => {
  //   if (startEndTimes) {
  //     for (let i = 0; i < startEndTimes.length; i++) {
  //       const curr = startEndTimes[i];
  //       if (!unavailabilities[curr]) {
  //         unavailabilities[curr] = {
  //           startTime: null,
  //           endTime: null,
  //         };
  //       }
  //     }
  //   }
  // }, [startEndTimes]);

  return (
    <Box>
      <Text>{JSON.stringify(data)}</Text>
      <Button onClick={onPrev}>Prev</Button>
      <Button onClick={onNext}>Continue</Button>
    </Box>
  );
};

export default UnavailableTable;
