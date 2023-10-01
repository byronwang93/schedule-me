import { Box, Image } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
  return (
    <Box position="fixed" width="100%" top={0} left={0}>
        <Image src='./nwPlusLogo.png' width="60px" margin="30px" />
    </Box>
    ) 
}

export default Header