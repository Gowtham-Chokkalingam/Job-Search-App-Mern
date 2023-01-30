import { Box, Image, Text,Flex } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  const imgurl = "https://jobsgaar.com/blog/wp-content/uploads/2021/07/bigstock-170353778.jpg";
  const bgImg='https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm380-02-knyfs2py.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=9f205a1370cdea0be1f828b496c3bb4b'
  return (
    <Box w={"100%"} m="auto"  h={{md:'100vh',sm:'89vh',base:"90vh"}} py='4' bgImage={bgImg} backgroundRepeat={'no-repeat'} bgSize={'cover'}>
      <Flex bg="red.500" w={"70%"} m="auto" justify={'center'} my='4' >
        <Text as='b' fontSize={{md:'28px',sm:'16px'}}  textAlign={"center"} >
          Welcome To Job Search App
        </Text>
      </Flex>

      <Box  width={"70%"} m="auto">
        <Image boxSize="70%" objectFit={"contain"} margin="auto" src={imgurl} alt="Dan Abramov" />
      </Box>
      <Flex bg="red.500" w={"70%"} m="auto" my='4' justify={'center'}>
        <Text as='b' fontSize={{md:'28px',sm:'16px'}} textAlign={"center"}>
          Find Your Favourite Job
        </Text>
      </Flex>
    </Box>
  );
};

export default Home;
