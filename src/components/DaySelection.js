import {
  Box,
  HStack,
  Input,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import SecondaryButton from "./SecondaryButton";

const DaySelection = ({ onPrev, onNext }) => {
  const { data, setData } = useContext(DataContext);
  const [date, setDate] = useState("");
  const [finalDates, setFinalDates] = useState([]);

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
    console.log(finalDates, " is the data");
  }, [finalDates]);

  useEffect(() => {
    if (finalDates[0] === "") {
      console.log("made it");
      setFinalDates([date]);
    } else if (finalDates.includes(date)) {
      // do nothing
    } else {
      const newArray = [...finalDates, date];
      setFinalDates(newArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <VStack
      maxW={{ base: "360px", md: "680px" }}
      bgColor="#433860"
      p="30px"
      borderRadius="7px"
      alignItems="left"
    >
      <Text pb="4px">Select the days of your event</Text>
      <Input
        w={{ base: "300px", md: "600px" }}
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        placeholder="Select Date and Time"
        size="md"
        type="date"
      />
      <Box display="flex" flexWrap="wrap">
        {finalDates.map((date, id) => {
          if (date === "") return null;
          const formattedDate = formatDateToEnglish(date);
          return (
            <Tag
              mr="17px"
              mt="17px"
              p="10px"
              fontWeight="bold"
              bgGradient="linear(to-r, #0DEFE1, #78FF96)"
              key={id}
            >
              {formattedDate}
            </Tag>
          );
        })}
      </Box>
      <HStack pt="40px">
        <SecondaryButton onClick={onPrev}>Previous</SecondaryButton>
        <Spacer />
        <SecondaryButton
          onClick={() => {
            const englishDates = finalDates.map((date) =>
              formatDateToEnglish(date)
            );
            setData({ ...data, daysList: englishDates });
            onNext();
          }}
        >
          Continue
        </SecondaryButton>
      </HStack>
    </VStack>
  );
};

export default DaySelection;
