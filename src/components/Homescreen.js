import { Box, Button, Input, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { testFunction } from "../helpers/openai/openai";
import ScheduleTemplateParser from "../helpers/parsers/templateParser";

const Homescreen = () => {
  const [schedule, setSchedule] = useState({});
  const [names, setNames] = useState("");
  const [test, setTest] = useState("");

  const handleFileUpload = async (event) => {
    const parser = new ScheduleTemplateParser(event.target.files[0]);
    await parser.readFile();
    parser.compile();
    setSchedule(parser.json());
  };

  const handleClick = async () => {
    console.log("clicked");
    axios
      .post("http://localhost:3001/testRoute")
      .then((response) => {
        console.log(response, " is the response");
      })
      .catch((error) => {
        console.log(error, " is the error");
      });
    // fetch("/")
    //   .then((res) => res.json())
    //   .then((data) => setTest(data));
  };

  useEffect(() => {
    console.log(schedule, " is the schedule");
  }, [schedule]);

  return (
    <Box>
      <Textarea
        value={names}
        onChange={(e) => {
          let inputValue = e.target.value;
          setNames(inputValue);
        }}
        color="white"
        placeholder="names of all organizers"
      />
      <Button
        mt="20px"
        _hover={{
          cursor: "pointer",
        }}
        as="label"
        htmlFor="fileInput"
        style={{
          display: "inline-flex",
          padding: "12px 20px",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          borderRadius: "15px",
          background: "linear-gradient(90deg, #0DEFE1 0%, #78FF96 100%)",
        }}
      >
        Upload file
      </Button>
      <Button onClick={handleClick}>send a request</Button>
      <Input
        type="file"
        id="fileInput"
        display="none"
        onChange={handleFileUpload}
      />
      <Text color="white">{JSON.stringify(schedule)}</Text>
      <Text color="white">
        {test.name}, {test.age} is the test
      </Text>
    </Box>
  );
};

export default Homescreen;
