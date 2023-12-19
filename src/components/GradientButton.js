import { Button } from "@chakra-ui/react";

const GradientButton = ({ children, ...props }) => {
  return (
    <Button
      bgGradient="linear(to-r, #0DEFE1, #78FF96)"
      _hover={{ bgGradient: "linear(to-r, #00DBCE, #00D88A)" }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default GradientButton;
