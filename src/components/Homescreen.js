import { Box, Button, Input } from "@chakra-ui/react";
import React from "react";
import ScheduleTemplateParser from "../helpers/parsers/templateParser";

const Homescreen = () => {
  const [schedule, setSchedule] = React.useState({});

  const handleFileUpload = async (event) => {
    const parser = new ScheduleTemplateParser(event.target.files[0])
    await parser.readFile();
    parser.compile();
    setSchedule(parser.json());
  };

  return (
    <Box>
      <Button
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
          background:
            "linear-gradient(90deg, #0DEFE1 0%, #78FF96 100%)",
        }}
      >
        Upload file
      </Button>
      <Input
        type="file"
        id="fileInput"
        display="none"
        onChange={handleFileUpload}
      />
      {
        JSON.stringify(schedule)
      }
    </Box>
  );
};

export default Homescreen;
