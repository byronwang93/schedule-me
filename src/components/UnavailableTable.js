import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import SecondaryButton from "./SecondaryButton";

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
    // console.log(data, " is the data in the END");
    // console.log(startEndTimes, " is STARTEND");
    // console.log(increment, " is increment");
  }, [data, startEndTimes, increment]);

  const handleNameInputChange = (day, shiftIndex, e) => {
    const { value } = e.target;
    setUnavailabilities((prevUnavailabilities) => {
      const updatedUnavailabilities = { ...prevUnavailabilities };
      const currentShift = updatedUnavailabilities[day][shiftIndex];
      currentShift.unavailable = value.split(",").map((name) => name.trim());
      return updatedUnavailabilities;
    });
  };

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
        // console.log(curr, " is the curr");
        // console.log(unavailabilities, " is the THING");
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

          // console.log(start, end, " is the OOGABOOGA");
          setUnavailabilities({
            ...unavailabilities,
            [curr]: unavailIntervals,
          });
        }
      }
    }
  }, [data, increment, startEndTimes, unavailabilities]);

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
      <Text pt="200px">Last box of unavailabilities</Text>
      <Text>{JSON.stringify(data)}</Text>
      <Text>below</Text>
      {unavailabilities !== {} &&
        data?.daysList &&
        data?.daysList.map((day) => {
          const currDay = unavailabilities[day];
          if (currDay) {
            return (
              <Box>
                <Text fontSize="30px" fontWeight="bold">
                  {day}
                </Text>
                {currDay.map((shift, index) => {
                  return (
                    <Flex pt="10px" flexDir="column" key={index}>
                      <Text>List of people unavailable</Text>
                      <Flex flexDir="row">
                        <Text px="5px">{shift.start}</Text>
                        <Text px="5px">{shift.end}</Text>
                        <Input
                          type="text"
                          bgColor="white"
                          color="black"
                          placeholder="enter names here"
                          onChange={(e) => {
                            handleNameInputChange(day, index, e);
                          }}
                        />
                      </Flex>
                    </Flex>
                  );
                })}
              </Box>
            );
          } else {
            return null;
          }
        })}
      <Text>above</Text>
      <SecondaryButton onClick={onPrev}>Prev</SecondaryButton>
      <SecondaryButton
        onClick={() => {
          setData({ ...data, unavailabilities: unavailabilities });
          onNext();
        }}
      >
        Continue
      </SecondaryButton>
    </Box>
  );
};

export default UnavailableTable;
