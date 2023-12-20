import { Box, Input, Text } from "@chakra-ui/react";
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
    <Box>
      <Input
        value={date}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        placeholder="Select Date and Time"
        size="md"
        type="date"
      />
      <Text>final dates are: {finalDates}</Text>
      <SecondaryButton onClick={onPrev}>Previous</SecondaryButton>
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
    </Box>
  );
};

export default DaySelection;
