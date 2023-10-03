import { Box, Center, Text } from '@chakra-ui/react'
import React from 'react'

const InputOrganizers = () => {
  return (
    <Box 
      position="fixed" 
      bottom={0} 
      margin="70px" 
      backgroundColor="#433860" 
      width="65%" 
      height="50%"
      borderRadius="10px">
      <Text 
      fontSize="25px" 
      textAlign="center" 
      margin="40px" 
      color="white">
        1. Input the name of all the organizers here (names are separated by commas).
        </Text>
    </Box>
  )
}

export default InputOrganizers