import { Box, Flex, HStack, Input, Link, Spacer, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { DataContext } from "../App";
import SecondaryButton from "./SecondaryButton";

const UnavailableIncrements = ({ onPrev, onNext }) => {
  const { data, setData } = useContext(DataContext);
  const [interval, setInterval] = useState(1);

  return (
    <Box>
      <Text className="heading">Unavailability table details</Text>
      <Box
        mt="10px"
        w={{ base: "360px", md: "680px" }}
        borderRadius="7px"
        p="30px"
        bgColor="#433860"
      >
        <Text fontSize="18px" pb="20px">
          An example nwUnavailability table can be referenced{" "}
          <Link
            isExternal
            color="#33F5C7"
            href="https://www.notion.so/nwplus/nwHacks-2024-Unavailabilities-6a7ff41336254bd29c0756d602a09e52"
          >
            here
          </Link>
          .
        </Text>
        <Flex fontSize="18px" alignItems="center">
          <span>My unavailability tables is split up by</span>
          <Input
            type="number"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            mx="2"
            w="20"
          />
          <span>hour intervals.</span>
        </Flex>
      </Box>
      <HStack pt="30px">
        <SecondaryButton onClick={onPrev}>Previous</SecondaryButton>
        <Spacer />
        <SecondaryButton
          onClick={() => {
            setData({ ...data, increments: interval });
            onNext();
          }}
        >
          Continue
        </SecondaryButton>
      </HStack>
    </Box>
  );
};

export default UnavailableIncrements;
