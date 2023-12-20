import { Button } from "@chakra-ui/react";

const SecondaryButton = ({ children, ...props }) => {
  return (
    <Button bgColor="#E2D6FF" _hover={{ bgColor: "#C4B2F0" }} {...props}>
      {children}
    </Button>
  );
};

export default SecondaryButton;
