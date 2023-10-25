import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

const UnavailableIncrements = ({ onPrev, onNext }) => {
  const { data, setData } = useContext(DataContext);
  const [interval, setInterval] = useState(1);
  // console.log(data, " is data data data");

  // useEffect(() => {
  //   console.log(data, " is the data data data");
  // }, [data]);

  return (
    <Box>
      <Text>An example nwTable can be referenced here: notionlinkgoeshere</Text>
      <Flex alignItems="center">
        <span>Unavailability tables are split up by</span>
        <Input
          type="number"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          mx="2"
          w="20"
        />
        <span>hour intervals</span>
      </Flex>
      <Button onClick={onPrev}>Previous</Button>
      <Button
        onClick={() => {
          setData({ ...data, increments: interval });
          onNext();
        }}
      >
        Continue
      </Button>
    </Box>
  );
};

export default UnavailableIncrements;
