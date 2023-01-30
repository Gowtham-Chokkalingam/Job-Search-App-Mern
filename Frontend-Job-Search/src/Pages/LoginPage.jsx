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
  useColorModeValue,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLoginInAction } from "../Redux/Actions/userActions";
const intState = {
  email: "",
  password: "",
};
let bgImg="https://4kwallpapers.com/images/wallpapers/outrun-neon-dark-background-purple-3440x1440-4523.jpg"
const LoginPage = () => {
  const [formData, setFormData] = useState(intState);

  // console.log("formData:", formData);

  const [showPassword, setShowPassword] = useState(false);

  const { credentialsStatus, error, errorMsg, loginStatus, token, loading } = useSelector((state) => state.UserLogin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { email, password } = formData;

  let isEmpty = Boolean(email) && Boolean(password);

  const Toaster = (title, message, status) => {
    toast({
      title: title,
      position: "top",
      description: message,
      status: status,
      duration: 1200,
      isClosable: true,
    });
  };

  useEffect(() => {
    if (loginStatus && isEmpty) {
      if (token.role === "admin") {
        setTimeout(() => {
          navigate("/adminjobform");
        }, 1600);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 1600);
      }
    }
  }, [loginStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handleSubmit:");

    dispatch(userLoginInAction(email, password, Toaster));
  };

  return (
    <Flex
      justify={"center"}
      h={"100vh"}
    py={'4'}
      bgImage={bgImg}
    >
      <Stack spacing={2} mx={"auto"} maxW={"lg"} px={6}>
        <Stack align={"center"}>
          <Flex bg={"#2146C7"} w={"100%"} m="auto" justify={"center"} p="4" rounded={"md"}>
            <Heading fontSize={"xl"} textAlign={"center"}>
              Login To Job-Search Account
            </Heading>
          </Flex>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} textColor={"black"} p={8}>
          <Stack spacing={4}>
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
            <Stack spacing={10} pt={2}>
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
                  Sign In
                </Button>
              )}
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Not Registered Yet?{" "}
                <Link to={"/Signup"} style={{ color: "blue" }}>
                  Signup
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
