import { Box, Button, Input } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

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

  return (
    <Box>
      <Input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Select Date and Time"
        size="md"
        type="date"
      />
      <Button
        onClick={() => {
          const newArray = [...finalDates, date];
          setFinalDates(newArray);
        }}
      >
        Select Date
      </Button>
      <Button onClick={onPrev}>Previous</Button>
      <Button
        onClick={() => {
          const englishDates = finalDates.map((date) =>
            formatDateToEnglish(date)
          );
          setData({ ...data, daysList: englishDates });
          onNext();
        }}
      >
        Continue
      </Button>
    </Box>
  );
};

export default DaySelection;
