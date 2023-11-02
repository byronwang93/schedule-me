import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { DataContext } from "../App";

const Shifts = ({ onPrev, onNext }) => {
  const { data } = useContext(DataContext);

  const { shiftSchedule } = data;

  useEffect(() => {
    console.log(data, " is the data FINALLY");
  }, [data]);
  return (
    <Box>
      <Flex flexDir="column">
        {shiftSchedule.map((d, index) => {
          const { day, shifts } = d;
          return (
            <Box key={index}>
              <Text fontSize="30px">{day}</Text>
              {shifts.map((shift, index) => {
                const {
                  name,
                  startTime,
                  endTime,
                  shiftLeader,
                  assignedPeople,
                } = shift;
                return (
                  <Flex
                    key={index}
                    flexDir="column"
                    bgColor="green.400"
                    m="20px"
                  >
                    <Text>Shift name: {name}</Text>
                    <Text>Start time: {startTime}</Text>
                    <Text>End time: {endTime}</Text>
                    <Text>Shift leader: {shiftLeader}</Text>
                    <Flex flexDirection="column">
                      <Text>Assigned people:</Text>
                      <Flex flexDirection="row">
                        {assignedPeople.map((p, i) => {
                          return <Text key={i}>{p}</Text>;
                        })}
                      </Flex>
                    </Flex>
                  </Flex>
                );
              })}
            </Box>
          );
        })}
      </Flex>
      <Button onClick={onPrev}>Previous</Button>
      <Button
        onClick={() => {
          onNext();
        }}
      >
        Continue
      </Button>
    </Box>
  );
};

export default Shifts;
