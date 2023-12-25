import {
  Box,
  Flex,
  HStack,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
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

          setUnavailabilities({
            ...unavailabilities,
            [curr]: unavailIntervals,
          });
        }
      }
    }
  }, [data, increment, startEndTimes, unavailabilities]);

  return (
    <VStack w={{ base: "360px", md: "680px" }}>
      <Text alignSelf="baseline" pt="80px" className="heading">
        Input unavailabilities
      </Text>
      {unavailabilities !== {} &&
        data?.daysList &&
        data?.daysList.map((day) => {
          const currDay = unavailabilities[day];
          if (currDay) {
            return (
              <Box pt="20px" w={{ base: "360px", md: "680px" }}>
                <Text pb="7px" fontSize="20px" fontWeight="bold">
                  {day}
                </Text>
                <VStack
                  alignItems="normal"
                  borderRadius="7px"
                  p="30px"
                  bgColor="#433860"
                  maxH="500px"
                  overflowY="auto"
                >
                  {currDay.map((shift, index) => {
                    return (
                      <Flex pb="10px" px="13px" flexDir="column" key={index}>
                        <Text pb="3px" fontSize="17px">
                          {shift.start} - {shift.end}
                        </Text>
                        <Input
                          type="text"
                          placeholder="enter names here"
                          onChange={(e) => {
                            handleNameInputChange(day, index, e);
                          }}
                        />
                      </Flex>
                    );
                  })}
                </VStack>
              </Box>
            );
          } else {
            return null;
          }
        })}
      <HStack py="30px" w="100%">
        <SecondaryButton onClick={onPrev}>Previous</SecondaryButton>
        <Spacer />
        <SecondaryButton
          onClick={() => {
            setData({ ...data, unavailabilities: unavailabilities });
            onNext();
          }}
        >
          Continue
        </SecondaryButton>
      </HStack>
    </VStack>
  );
};

export default UnavailableTable;
