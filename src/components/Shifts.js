import {
  Box,
  Divider,
  Flex,
  HStack,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import SecondaryButton from "./SecondaryButton";

const Shifts = ({ onPrev, onNext }) => {
  const { data } = useContext(DataContext);

  const { shiftSchedule } = data;
  const [selectedDate, setSelectedDate] = useState(shiftSchedule[0]?.day || 0);
  const [dateDetails, setDateDetails] = useState(null);

  const formatDateToEnglish = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const newDate = new Date(dateString + "T00:00:00");

    return newDate.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const currDate = shiftSchedule.find((shift) => shift.day === selectedDate);
    setDateDetails(currDate?.shifts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleDateChange = (event) => {
    console.log(event.target.value, " is clicked");
    setSelectedDate(event.target.value);
  };

  return (
    <Box pt="50px">
      <Flex flexDir="column">
        <Text color="#20FFAF" className="heading">
          Schedule
        </Text>
        <Select
          pt="10px"
          w={{ base: "240px", md: "270px" }}
          placeholder="Select date"
          onChange={handleDateChange}
          value={selectedDate}
        >
          {shiftSchedule.map((d, index) => {
            const { day } = d;
            const updatedDay = formatDateToEnglish(day);
            return (
              <option key={index} value={day}>
                {updatedDay}
              </option>
            );
          })}
        </Select>

        <VStack pt="30px">
          <HStack alignSelf="baseline" spacing="25px">
            <Text className="subheading" pl="22px" pr="65px">
              Shift name
            </Text>
            <Text className="subheading" pr="57px">
              Time
            </Text>
            <Text className="subheading">Shift leader</Text>
            <Text className="subheading">Scheduled</Text>
          </HStack>
          <VStack
            w={{ base: "360px", md: "680px" }}
            py="10px"
            px="15px"
            borderRadius="5px"
            bgColor="#433860"
            alignItems="baseline"
            overflowY="auto"
            maxHeight="500px"
          >
            {dateDetails &&
              dateDetails.map((shift, index) => {
                const {
                  name,
                  startTime,
                  endTime,
                  shiftLeader,
                  assignedPeople,
                } = shift;
                return (
                  <Box>
                    <HStack pl="10px" py="10px" key={index}>
                      <Text w="150px" overflowX="auto">
                        {name}
                      </Text>
                      <Text pl="8px" w="119px">
                        {startTime}-{endTime}
                      </Text>
                      <Text w="98px">{shiftLeader}</Text>
                      <Text overflowX="auto" w="244px">
                        {assignedPeople}
                      </Text>
                    </HStack>
                    {index !== dateDetails.length - 1 && (
                      <Divider ml="1.5%" w="95%" />
                    )}
                  </Box>
                );
              })}
          </VStack>
        </VStack>
      </Flex>
      <SecondaryButton mt="40px" px="30px" onClick={onPrev}>
        Calculate Again
      </SecondaryButton>
    </Box>
  );
};

export default Shifts;
