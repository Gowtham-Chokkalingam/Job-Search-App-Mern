import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { companiesImg } from "../data/images";
let imgUrl = companiesImg
const ShowSearchResults = ({ companyName, location, position,index }) => {
  return (
    <>
      <Flex my={"2"} justify="space-between" align={"center"}>
        <Image boxSize={"80px"} src={imgUrl[index]} alt="f"></Image>
        <Text as='b'>{companyName}</Text>
        <Text as='b' >{position}</Text>
        <Text as='i'>{location}</Text>
      </Flex>
      <Divider></Divider>
    </>
  );
};

export default ShowSearchResults;
