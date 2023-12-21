import { Box, Input, Text, VStack } from "@chakra-ui/react";
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
    <Box>
      <Text>Select the start and end hours of each day</Text>
      {days.map((day, index) => {
        return (
          <Box key={index}>
            <Text>{day}</Text>
            <VStack>
              <Text>Start time</Text>
              <Input
                defaultValue="08:00"
                type="time"
                onChange={(e) => {
                  handleStartTimeChange(day, e.target.value);
                }}
              />
            </VStack>
            <VStack>
              <Text>End time</Text>
              <Input
                defaultValue="18:00"
                type="time"
                onChange={(e) => {
                  handleEndTimeChange(day, e.target.value);
                }}
              />
            </VStack>
          </Box>
        );
      })}
      hello world this is the day hours
      <SecondaryButton onClick={onPrev}>Previous</SecondaryButton>
      <SecondaryButton
        onClick={() => {
          setData({ ...data, startEndTimes: hours });
          onNext();
        }}
      >
        Continue
      </SecondaryButton>
    </Box>
  );
};

export default DayHours;
