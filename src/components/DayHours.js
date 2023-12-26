import { Box, HStack, Input, Spacer, Text, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import SecondaryButton from "./SecondaryButton";

const DayHours = ({ onPrev, onNext }) => {
  const { data, setData } = useContext(DataContext);
  const [days, setDays] = useState([]);
  const [hours, setHours] = useState({});

  useEffect(() => {
    setDays(data.daysList);
  }, [data]);

  useEffect(() => {
    console.log(hours, " ius the hours");
  }, [hours]);

  useEffect(() => {
    console.log(days, " is days");
    for (let i = 0; i < days.length; i++) {
      const currDay = days[i];
      hours[currDay] = {
        start: "08:00",
        end: "18:00",
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const handleStartTimeChange = (day, value) => {
    setHours((prevHours) => ({
      ...prevHours,
      [day]: { ...prevHours[day], start: value },
    }));
  };

  const handleEndTimeChange = (day, value) => {
    setHours((prevHours) => ({
      ...prevHours,
      [day]: { ...prevHours[day], end: value },
    }));
  };

  return (
    <Box w={{ base: "360px", md: "680px" }}>
      <Text pt="20px" className="heading">
        Select the start and end times of each day
      </Text>
      {days.map((day, index) => {
        return (
          <Box pt="20px" w={{ base: "360px", md: "680px" }} key={index}>
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
              fontSize="18px"
            >
              <VStack alignItems="baseline">
                <Text>Start time</Text>
                <Input
                  defaultValue="08:00"
                  type="time"
                  onChange={(e) => {
                    handleStartTimeChange(day, e.target.value);
                  }}
                />
              </VStack>
              <VStack alignItems="baseline">
                <Text>End time</Text>
                <Input
                  defaultValue="18:00"
                  type="time"
                  onChange={(e) => {
                    handleEndTimeChange(day, e.target.value);
                  }}
                />
              </VStack>
            </VStack>
          </Box>
        );
      })}
      <HStack pt="30px">
        <SecondaryButton onClick={onPrev}>Previous</SecondaryButton>
        <Spacer />
        <SecondaryButton
          onClick={() => {
            setData({ ...data, startEndTimes: hours });
            onNext();
          }}
        >
          Continue
        </SecondaryButton>
      </HStack>
    </Box>
  );
};

export default DayHours;
