import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import GradientButton from "./GradientButton";
import SecondaryButton from "./SecondaryButton";

const DayShiftList = ({ onPrev, onNext }) => {
  const { data, setData } = useContext(DataContext);
  const [dates, setDates] = useState([]);
  const [shifts, setShifts] = useState({});

  const [shiftName, setShiftName] = useState("");
  const [requiredNames, setRequiredNames] = useState("");
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
    <Box w={{ base: "360px", md: "680px" }} p="30px">
      <Text className="heading">Add your shifts to each day</Text>
      <GradientButton px="40px" my="17px" onClick={onOpen}>
        Add Shift
      </GradientButton>
      <Flex flexDirection="column">
        {/* <Text>Total Shifts</Text>
        <Text>{JSON.stringify(shifts)}</Text> */}
        {Object.entries(shifts).map(([shiftName, shiftList], id) => {
          return (
            <Box key={id} pb="20px">
              <Text className="heading">{shiftName}</Text>
              <Box>
                <HStack spacing="60px" color="#818181">
                  <Text pl="10px" pr="35px" className="subheading">
                    Shift name
                  </Text>
                  <Text className="subheading">Start</Text>
                  <Text className="subheading">End</Text>
                  <Text className="subheading">Required</Text>
                  <Text className="subheading">Recurring</Text>
                </HStack>
                <VStack
                  borderRadius="5px"
                  maxHeight="500px"
                  minHeight="40px"
                  bgColor="#433860"
                >
                  {shiftList.map((singleShift, id) => {
                    const {
                      endTime,
                      startTime,
                      name,
                      numRequiredPeople,
                      recurringEvent,
                    } = singleShift;
                    return (
                      <Box w="-webkit-fill-available">
                        <HStack
                          alignSelf="baseline"
                          spacing="10px"
                          py="13px"
                          fontSize="17px"
                          key={id}
                          pl="15px"
                        >
                          <Text w="145px" overflowX="auto">
                            {name}
                          </Text>
                          <Text w="90px" pl="12px">
                            {startTime}
                          </Text>
                          <Text pl="4px" w="80px">
                            {endTime}
                          </Text>
                          <Text pl="5px" w="118px">
                            {numRequiredPeople}
                          </Text>
                          <Text>{JSON.stringify(recurringEvent)}</Text>
                        </HStack>
                        {id !== shiftList.length - 1 && (
                          <Divider ml="2.5%" w="95%" />
                        )}
                      </Box>
                    );
                  })}
                </VStack>
              </Box>
            </Box>
          );
        })}
      </Flex>
      <Box mt="30px" display="flex" flexDir="row">
        <SecondaryButton onClick={() => onPrev()}>Previous</SecondaryButton>
        <Spacer />
        <SecondaryButton
          onClick={() => {
            setData({ ...data, shifts: shifts });
            onNext();
          }}
        >
          Next
        </SecondaryButton>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#433860">
          <ModalHeader>Adding shifts</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="row" flexWrap="wrap">
              {dates.map((date, index) => {
                return (
                  <GradientButton
                    m="5px"
                    p="10px"
                    key={index}
                    onClick={() => setShiftDate(index)}
                    border={shiftDate === index && "2px solid white"}
                    fontSize="15px"
                  >
                    {date}
                  </GradientButton>
                );
              })}
            </Flex>
            <VStack py="10px">
              <Text alignSelf="start">Shift Name*</Text>
              <Input
                placeholder="shift name"
                value={shiftName}
                onChange={(e) => setShiftName(e.target.value)}
              />
            </VStack>
            <VStack py="10px">
              <Text alignSelf="start">Start Time*</Text>
              <Input
                placeholder="start time"
                type="time"
                value={shiftStart}
                onChange={(e) => setShiftStart(e.target.value)}
              />
            </VStack>
            <VStack py="10px">
              <Text alignSelf="start">End Time*</Text>
              <Input
                placeholder="end time"
                type="time"
                value={shiftEnd}
                onChange={(e) => setShiftEnd(e.target.value)}
              />
            </VStack>
            <VStack py="10px">
              <Text alignSelf="start">Required Attendee(s)</Text>
              <Textarea
                placeholder="separate names by commas"
                value={requiredNames}
                onChange={(e) => setRequiredNames(e.target.value)}
              />
            </VStack>
            <VStack py="10px">
              <Text alignSelf="start">
                Number of people required per shift*
              </Text>
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
              bgColor="#E2D6FF"
              _hover={{
                bgColor: "#C4B2F0",
              }}
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
              _hover={{
                bgColor: "#5BFFC4",
              }}
              bgColor="#A6FFDF"
              onClick={() => {
                const namesArray = requiredNames.split(",");
                const trimmedArray = namesArray.map((str) => str.trim());

                const data = {
                  name: shiftName,
                  startTime: shiftStart,
                  endTime: shiftEnd,
                  numRequiredPeople: shiftRequiredNum,
                  requiredNames: trimmedArray,
                  recurringEvent: recurringEvent,
                  reassignValue: reassignValue,
                };
                shifts[dates[shiftDate]].push(data);

                onClose();

                setShiftName("");
                setRequiredNames("");
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
