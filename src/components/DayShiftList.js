import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";

const DayShiftList = ({ onPrev, onNext }) => {
  const { data, setData } = useContext(DataContext);
  const [dates, setDates] = useState([]);
  const [shifts, setShifts] = useState({});

  const [shiftName, setShiftName] = useState("");
  const [shiftDate, setShiftDate] = useState(0);
  const [shiftStart, setShiftStart] = useState("");
  const [shiftEnd, setShiftEnd] = useState("");
  const [shiftRequiredNum, setShiftRequiredNum] = useState(0);
  const [recurringEvent, setRecurringEvent] = useState(false);
  const [reassignValue, setReassignValue] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    console.log(data, " is the DATA");
  }, [data]);

  useEffect(() => {
    setDates(data.daysList);
  }, [data]);

  useEffect(() => {
    const tempShifts = { ...shifts };
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      if (!tempShifts[date]) {
        tempShifts[date] = [];
      }
    }

    setShifts(tempShifts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dates]);

  useEffect(() => {
    console.log(shifts, " is shifts");
  }, [shifts]);

  return (
    <Box>
      <Button onClick={onOpen}>Add Shift</Button>
      <Flex flexDirection="column">
        <Text>Total Shifts</Text>
        <Text>{JSON.stringify(shifts)}</Text>
      </Flex>
      <Box mt="30px">
        <Button onClick={() => onPrev()}>Previous</Button>
        <Button
          onClick={() => {
            setData({ ...data, shifts: shifts });
            onNext();
          }}
        >
          Next
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="gray.700">
          <ModalHeader>Adding shifts lol</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="row">
              {dates.map((date, index) => {
                return (
                  <Box
                    m="5px"
                    p="10px"
                    border={shiftDate === index && "2px solid white"}
                    bgColor="blue.500"
                    key={index}
                    _hover={{
                      cursor: "pointer",
                      backgroundColor: "blue.600",
                    }}
                    onClick={() => setShiftDate(index)}
                  >
                    <Text>{date}</Text>
                  </Box>
                );
              })}
            </Flex>
            <VStack py="10px">
              <Text alignSelf="start">Shift Name</Text>
              <Input
                placeholder="shift name"
                value={shiftName}
                onChange={(e) => setShiftName(e.target.value)}
              />
            </VStack>
            <VStack py="10px">
              <Text alignSelf="start">Start Time</Text>
              <Input
                placeholder="start time"
                type="time"
                value={shiftStart}
                onChange={(e) => setShiftStart(e.target.value)}
              />
            </VStack>
            <VStack py="10px">
              <Text alignSelf="start">End Time</Text>
              <Input
                placeholder="end time"
                type="time"
                value={shiftEnd}
                onChange={(e) => setShiftEnd(e.target.value)}
              />
            </VStack>
            <VStack py="10px">
              <Text alignSelf="start">Number of people required per shift</Text>
              <Input
                placeholder="number of people required per shift"
                type="number"
                value={shiftRequiredNum}
                onChange={(e) => setShiftRequiredNum(e.target.value)}
              />
            </VStack>
            <Checkbox
              value={recurringEvent}
              onChange={(e) => setRecurringEvent(e.target.checked)}
            >
              Recurring event?
            </Checkbox>
            {recurringEvent && (
              <Flex alignItems="center">
                <span>Reassign shifts every</span>
                <Input
                  type="number"
                  value={reassignValue}
                  onChange={(e) => setReassignValue(e.target.value)}
                  mx="2"
                  w="20"
                />
                <span>hours</span>
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                setShiftName("");
                setShiftDate(0);
                setShiftStart("");
                setShiftEnd("");
                setShiftRequiredNum(0);
                setRecurringEvent(false);
                setReassignValue(0);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                const data = {
                  name: shiftName,
                  startTime: shiftStart,
                  endTime: shiftEnd,
                  numRequiredPeople: shiftRequiredNum,
                  recurringEvent: recurringEvent,
                  reassignValue: reassignValue,
                };
                shifts[dates[shiftDate]].push(data);

                onClose();

                setShiftName("");
                setShiftDate(0);
                setShiftStart("");
                setShiftEnd("");
                setShiftRequiredNum(0);
                setRecurringEvent(false);
                setReassignValue(0);
              }}
            >
              Save shift
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DayShiftList;
