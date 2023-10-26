import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";

const LandingPage = ({ onNext }) => {
  return (
    <Box color="#20FFAF" textAlign="center">
      <Text fontSize="60px" paddingBottom="10px">
        Schedule Me
      </Text>
      <Button
        onClick={onNext}
        fontSize="23px"
        padding="25px 35px"
        bgGradient="linear-gradient(to right, #0DEFE1, #78FF96)"
        _hover={{
          bgGradient: "linear-gradient(to right, #0AC0B5, #60CE79)",
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default LandingPage;
