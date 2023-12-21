import { Box, Flex, Input, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import SecondaryButton from "./SecondaryButton";

const UnavailableIncrements = ({ onPrev, onNext }) => {
  const { data, setData } = useContext(DataContext);
  const [interval, setInterval] = useState(1);

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
      <SecondaryButton onClick={onPrev}>Previous</SecondaryButton>
      <SecondaryButton
        onClick={() => {
          setData({ ...data, increments: interval });
          onNext();
        }}
      >
        Continue
      </SecondaryButton>
    </Box>
  );
};

export default UnavailableIncrements;
