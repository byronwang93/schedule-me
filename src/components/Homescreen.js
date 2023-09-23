import { Box, Button, Input } from "@chakra-ui/react";
import React from "react";
import { readFile } from "../helpers/helper";

const Homescreen = () => {
  const handleFileUpload = (event) => {
    readFile(event);
  };

  return (
    <Box>
      <Button
        _hover={{
          cursor: "pointer",
        }}
        as="label"
        htmlFor="fileInput"
      >
        Upload file
      </Button>
      <Input
        type="file"
        id="fileInput"
        display="none"
        onChange={handleFileUpload}
      />
    </Box>
  );
};

export default Homescreen;
