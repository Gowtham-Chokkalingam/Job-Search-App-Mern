import { Button, ButtonGroup } from "@chakra-ui/button";
import { Card, CardBody, CardFooter } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Divider, Heading, Stack, Text } from "@chakra-ui/layout";
import { useState, memo } from "react";
import { useSelector } from "react-redux";

const UserJobListCard = ({ companyName, position, contract, location, imgData, handleApply, _id, applyBtn, setI, idx, index }) => {
  return (
    <Card bg='#0E5E6F' maxW="sm" h={"100%"} gap={{ md: 4 ,lg:2}}>
      <CardBody>
        <Image boxSize={"60%"} m="auto" objectFit={"contain"} src={imgData} alt="it company" borderRadius="lg" />
        <Stack spacing="3">
          <Heading size="md" as="b" color="white" >Company Name: {companyName}</Heading>

          <Text as="b" color="white" >Position: {position}</Text>
          <Text as="b" color="white" fontSize="md">
            Work-Mode: {contract}
          </Text>
          <Divider></Divider>
          <Heading size="sm" cas="b" color="white" >
            Location: {location}
          </Heading>
        </Stack>
      </CardBody>
      <CardFooter mt="6" justify={'center'}>
        <ButtonGroup spacing="2">
          <Button textAlign={'center'}
            isLoading={index === idx}
            loadingText="Applying"
            variant={applyBtn === "Applied" ? "solid" : "solid"}
            isDisabled={applyBtn === "Applied"}
            colorScheme={applyBtn === "Applied" ? "red" : "yellow"}
            onClick={() => {
              handleApply(_id);
              setI(index);
            }}
          >
            {" "}
            {applyBtn}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default UserJobListCard;
