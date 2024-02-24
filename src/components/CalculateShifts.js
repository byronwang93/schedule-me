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

  const retrieveIndivData = () => {
    const userData = {};
    const users = data?.names;
    console.log("retriving indiv data!");
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const usersShifts = {};
      const scheduledUnavailabilities = [];

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
          // temp here
        }

        usersShifts[day?.day] = userDayShifts;
      }

      userData[user] = {
        shifts: usersShifts,
        shiftedUnavailabilities: null,
      };
    }

    console.log(userData, " is USER DATA");
    setUserInfo(userData);
  };

  useEffect(() => {
    console.log(data, " is final updated data byron");
  }, [data]);

  // useEffect(() => {
  //   if (finalShifts) {
  //     retrieveIndivData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [finalShifts]);

  useEffect(() => {
    if (finalShifts) {
      console.log(finalShifts, " is the final product");
      // const parsedShifts = JSON.parse(finalShifts)
      // const daysArray = parsedShifts.properties.days;
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
