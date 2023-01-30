import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Grid, GridItem } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { jobPostAction } from "../Redux/Actions/jobAction";
let bgImg =
  "https://thumbs.dreamstime.com/b/dark-purple-old-brick-wall-backdrop-dark-purple-old-brick-wall-backdrop-architecture-facade-texture-house-interior-background-186012938.jpg";
let initState = {
  companyName: "",
  position: "",
  contract: "",
  location: "",
};
const AdminJobFormPage = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const [formData, setFormData] = useState(initState);
  const { companyName, position, location, contract } = formData;

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  function Toaster(title, message, status) {
    return toast({
      title: title,
      position: "top",
      description: message,
      status: status,
      duration: 1200,
      isClosable: true,
    });
  }
  const hanldeClick = () => {
    console.log("formData:", formData);
    dispatch(jobPostAction(formData, Toaster));
    setFormData(initState);
  };
  return (
    <Box width={"100%"} h={"100vh"} margin="auto" color="black" bgImage={bgImg} p="6" backgroundRepeat={"no-repeat"} bgSize={"cover"}>
      <Flex bg="red.500" maxW={{ md: "40%", sm: "50%", base:"60%" }} m="auto" justify={"center"} my="4">
        <Text as="b" fontSize={{ md: "20px", sm: "12px", base: "12px" }} color="white" textAlign={"center"}>
          Welcome - Add New Job Here
        </Text>
      </Flex>
      <Grid
        mt={2}
        w={{ md: "40%", sm: "60%", base: "60%" }}
        h={"70%"}
        m={"auto"}
        bg={"white"}
        p="4"
        px="6"
        rounded={8}
        templateColumns="repeat(2, 1fr)"
        gap={2}
      >
        {/* 1 Company Name */}
        <GridItem colSpan={{ base: 2, md: 2 }}>
          <FormControl isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input placeholder="Name" type="text" name="companyName" value={companyName} onChange={handleChange} />
          </FormControl>
        </GridItem>
        <GridItem colSpan={{ base: 2, md: 2 }}>
          {/* Position */}
          <FormControl isRequired>
            <FormLabel>Position</FormLabel>
            <Select placeholder="Select Position" name="position" value={position} onChange={handleChange}>
              <option value="Senior Software Engineer">Senior Software Engineer</option>
              <option value="Senior Application Engineer">Senior Application Engineer</option>
              <option value="Haskell and Pure Script Dev">Haskell and Pure Script Dev</option>
              <option value="Remote DevOps Engineer">Remote DevOps Engineer</option>
              <option value="Midlevel Back End Engineer">Midlevel Back End Engineer</option>
              <option value="Desktop Support Manager">Desktop Support Manager</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 2 }}>
          <FormControl isRequired>
            <FormLabel>Contract</FormLabel>
            <Select placeholder="Select Contract" name="contract" value={contract} onChange={handleChange}>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </Select>
          </FormControl>
        </GridItem>

        <GridItem colSpan={{ base: 2, md: 2 }}>
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input placeholder="Location" type="text" name="location" value={location} onChange={handleChange} />
          </FormControl>
        </GridItem>

        {/* 8 Buttom */}
        <GridItem colSpan={2}>
          <FormControl isRequired>
            <Button colorScheme="red" onClick={hanldeClick} w={"full"}>
              Add Job
            </Button>
          </FormControl>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AdminJobFormPage;
