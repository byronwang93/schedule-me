import { Box, HStack, Spacer, Spinner, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import GradientButton from "./GradientButton";
import SecondaryButton from "./SecondaryButton";

const CalculateShifts = ({ onNext, onPrev }) => {
  const { data, setData } = useContext(DataContext);
  const [shifts, setShifts] = useState(null);
  const [finalShifts] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(data, " is the data END END END");
  }, [data]);

  const formatDateToEnglish = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const newDate = new Date(dateString + "T00:00:00");

    return newDate.toLocaleDateString("en-US", options);
  };

  const retrieveIndivData = () => {
    const userData = {};
    const users = data?.names;
    console.log("retriving indiv data!");
    const unavailabilities = data?.unavailabilities;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const usersShifts = {};
      const scheduledUnavailabilities = {};

      // get list of each shift for each day
      for (const day of shifts) {
        // key = day
        // val = array of shifts for that day
        const userDayShifts = [];
        const dayShifts = day?.shifts;
        for (let j = 0; j < dayShifts.length; j++) {
          const currShift = dayShifts[j];
          if (currShift?.assignedPeople.includes(user)) {
            userDayShifts.push({
              shift: currShift?.name,
              startTime: currShift?.startTime,
              endTime: currShift?.endTime,
              shiftLeader: currShift?.shiftLeader === user,
            });
          }

          // get list of when they were scheduled and they were unavailable
        }

        usersShifts[day?.day] = userDayShifts;
      }

      console.log(usersShifts, " is usersShifts");
      for (const [day, assignedShifts] of Object.entries(usersShifts)) {
        const userDayUnavailabilities = [];
        console.log(day, " is the day");
        console.log(assignedShifts, " is the assignedShifts");
        // day is the shift day
        // assignedShifts is array of objects for each shift that user has that day
        for (let j = 0; j < assignedShifts.length; j++) {
          const curr = assignedShifts[j];
          const start = curr?.startTime;
          const end = curr?.endTime;
          const selectedDateUnavailabilities =
            unavailabilities[formatDateToEnglish(day)];

          console.log(selectedDateUnavailabilities, " is the selectedDay");
          for (const unavailable of selectedDateUnavailabilities) {
            // unavailable is like this:
            // {
            //   "start": "08:00",
            //   "end": "09:00",
            //   "unavailable": []
            // }

            // start here is the persons shift start
            // end here is the persons shift end
            if (
              ((unavailable?.start <= start && start <= unavailable?.end) ||
                (unavailable?.end <= end && end <= unavailable?.end)) &&
              unavailable?.unavailable.includes(user)
            ) {
              console.log("scheduled in a bad time");
              userDayUnavailabilities.push({
                shift: curr?.shift,
                userUnavailableFrom: unavailable?.start,
                userUnavailableTo: unavailable?.end,
                shiftLeader: curr?.shiftLeader,
                shiftStart: start,
                shiftEnd: end,
              });
              break;
            }
          }
        }

        scheduledUnavailabilities[day] = userDayUnavailabilities;
      }
      // console.log(usersShifts, ' is usersShifts');

      userData[user] = {
        shifts: usersShifts,
        shiftedUnavailabilities: scheduledUnavailabilities,
      };
    }

    console.log(userData, " is USER DATA");
    setUserInfo(userData);
  };

  useEffect(() => {
    console.log(data, " is final updated data byron");
  }, [data]);

  useEffect(() => {
    if (finalShifts) {
      console.log(finalShifts, " is the final product");
    }
  }, [finalShifts]);

  useEffect(() => {
    if (shifts) {
      retrieveIndivData();
    }
    if (shifts) {
      console.log("before shifts");
      setData({ ...data, shiftSchedule: shifts });
      console.log("after shifts");
    }
    if (userInfo) {
      console.log("before user info");
      setData({ ...data, userInfo: userInfo });
    }
    if (userInfo && shifts) {
      console.log("moving on");
      setIsLoading(false);
      onNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shifts, userInfo]);

  return (
    <Box
      w={{ base: "360px", md: "580px" }}
      p="40px"
      borderRadius="7px"
      bgColor="#433860"
    >
      {isLoading ? (
        <VStack textAlign="center">
          <Text className="heading" color="#20FFAF">
            Loading
          </Text>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#20FFAF"
            size="xl"
          />
        </VStack>
      ) : (
        <VStack>
          <Text pb="30px" alignSelf="baseline" fontSize="20px">
            Generate my schedule! :')
          </Text>
          <HStack w="-webkit-fill-available">
            <SecondaryButton onClick={onPrev}>Previous</SecondaryButton>
            <Spacer />
            <GradientButton
              onClick={async () => {
                console.log("clicked");
                setIsLoading(true);
                axios
                  .post("http://localhost:3001/make-shifts", data)
                  .then((response) => {
                    console.log(response, " is the response");
                    const responseData = response.data.completion.content;
                    const contentObject = JSON.parse(responseData); // Parse the content string into an object
                    if (contentObject?.properties?.days) {
                      const daysObject = contentObject.properties.days;
                      console.log(daysObject, " is the response we get");
                      setShifts(daysObject);
                    } else if (contentObject?.days) {
                      const daysObject = contentObject.days;
                      console.log(daysObject, " is the response we get");
                      setShifts(daysObject);
                    } else {
                      throw new Error(
                        "no valid response w/ this content: ",
                        contentObject
                      );
                    }
                  })
                  .catch((e) => {
                    console.log(e, " is an error");
                  });
              }}
            >
              Calculate Shifts!
            </GradientButton>
          </HStack>
        </VStack>
      )}
    </Box>
  );
};

export default CalculateShifts;
