import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  VisuallyHidden,
  VisuallyHiddenInput,
  useColorModeValue,
  Toast,
  useToast,
  Image,
  TagLabel,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginInAction, userSignUpAction } from "../Redux/Actions/userActions";
const intState = {
  email: "",
  password: "",
  name: "",
};
let bgImg = "https://4kwallpapers.com/images/wallpapers/outrun-neon-dark-background-purple-3440x1440-4523.jpg";

const SignUpPage = () => {
  const [formData, setFormData] = useState(intState);

  const [showPassword, setShowPassword] = useState(false);

  const { credentialsStatus, registerStatus, errorMsg, loginStatus, token, loading } = useSelector((state) => state.UserSignup);
  const data = useSelector((state) => state.UserSignup);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { email, password, name, proPic } = formData;

  let isEmpty = Boolean(email) && Boolean(password);

  const displayTost = (title, status, message) => {
    toast({
      title: title,
      position: "top",
      description: message,
      status: status,
      duration: 2000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (registerStatus) {
      displayTost("User Signup Success", "success", "Signup Success");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    if (credentialsStatus) {
      displayTost("Wrong Credentials", "warning", errorMsg);
    }
  }, [registerStatus, credentialsStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userSignUpAction(formData));
  };

  return (
    <Flex justify={"center"} mb={6} h={"100vh"} py={"4"} bgImage={bgImg}>
      <Box>
        <Stack spacing={2} mx={"auto"} maxW={"lg"} py={1} px={6}>
          <Stack align={"center"}>
            <Flex bg={"#2146C7"} w={"100%"} m="auto" justify={"center"} p="4" rounded={"md"}>
              <Heading fontSize={"xl"} textAlign={"center"}>
                Signup To Job-Search
              </Heading>
            </Flex>
          </Stack>
          <Box w={"400px"} rounded={"lg"} bg={"white"} boxShadow={"lg"} textColor={"black"} p={8}>
            <Stack spacing={2}>
              <FormControl id="name" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input type="text" name="name" value={name} onChange={handleChange} isRequired />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" value={email} onChange={handleChange} isRequired />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} name="password" value={password} onChange={handleChange} isRequired />
                  <InputRightElement h={"full"}>
                    <Button variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Text></Text>
              <Stack>
                {loading ? (
                  <Button isLoading loadingText="Loading" colorScheme="teal" variant="outline" spinnerPlacement="start">
                    Submit
                  </Button>
                ) : (
                  <Button
                    isLoading={loading}
                    loadingText="Submitting"
                    size="lg"
                    bg={"red.500"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </Button>
                )}
              </Stack>
              <Stack pt={0}>
                <Text align={"center"}>
                  Already Have Account?{" "}
                  <Link to={"/login"} style={{ color: "blue" }}>
                    Sign in
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default SignUpPage;
