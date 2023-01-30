import {
  Box,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { nodataFound } from "../data/images";
import { deleteAppliedJobAction, getAppliedJobAction, updateAppliedJobAction } from "../Redux/Actions/jobAppliedAction";
let nodataFoundImg = nodataFound;
let bgImg = "https://4kwallpapers.com/images/wallpapers/outrun-neon-dark-background-purple-3440x1440-4523.jpg";

const UserAppliedJobs = () => {
  const [data, setData] = useState([]);
  const { loginStatus, token } = useSelector((state) => state.UserLogin);
  const navigate = useNavigate();
  const toast = useToast();

  const { jobAppliedListStatus, loading, response } = useSelector((state) => state.AppliedJobs);
  const { appliedStatus } = useSelector((state) => state.JobApply);

  const { deleteAppliedJobStatus, response: deltedResponse } = useSelector((state) => state.DelteAppliedJob);

  const { editedStatus } = useSelector((state) => state.UpdateAppliedJob);

  const dispatch = useDispatch();

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
  const getData = () => {
    dispatch(getAppliedJobAction());
  };

  useEffect(() => {
    if (loginStatus && !jobAppliedListStatus) {
      getData();
    } else if (!loginStatus) {
      navigate("/Login");
    }
    if (deleteAppliedJobStatus) {
      Toaster("Job Deleted", `${deltedResponse.jobDelted.companyName} Job has been deleted`, "info");
    }
  }, [loginStatus, jobAppliedListStatus, deleteAppliedJobStatus]);

  const handleDelete = (id, job) => {
    dispatch(deleteAppliedJobAction(id));
  };
  const handleStatus = (value, id) => {
    dispatch(updateAppliedJobAction(id, value, Toaster));
  };

  return (
    <Box w={"100%"} m="auto" minH={"100vh"} bgImage={bgImg} p="6">
      {!loading && response.length < 1 ? (
        <VStack w="full" m="auto" textAlign={"center"}>
          <Text as="b">NO JOBS APPLIED YET</Text>
          <Image boxSize="lg" src={nodataFoundImg} alt="nodataFoundImg"></Image>
        </VStack>
      ) : (
        <TableContainer px={"10"} w={"80%"} m='auto'>
          <Table variant="simple" colorScheme="red">
            <TableCaption>List of Job Applied </TableCaption>
            <Thead>
              <Tr>
                <Th>S.No</Th>
                <Th>Company</Th>
                <Th>Role</Th>
                <Th>Location</Th>
                <Th>Status</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!loading &&
                jobAppliedListStatus &&
                response?.map((ele, i) => {
                  return (
                    <Tr key={i}>
                      <Td>{i + 1}</Td>
                      <Td>{ele.job.companyName}</Td>
                      <Td>{ele.job.position}</Td>
                      <Td>{ele.job.location}</Td>
                      <Td>
                        <RadioGroup onChange={(value) => handleStatus(value, ele._id)} defaultValue={ele.Status}>
                          <Flex cursor={"pointer"} gap="4" justify={"space-between"}>
                            <Radio value="In-Progress">In-Progress</Radio>
                            <Radio value="Completed">Completed</Radio>
                          </Flex>
                        </RadioGroup>
                      </Td>

                      <Td>
                        <MdOutlineDeleteOutline
                          cursor={"pointer"}
                          onClick={() => {
                            handleDelete(ele._id, ele.job.companyName);
                          }}
                          size={"30px"}
                        ></MdOutlineDeleteOutline>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>{" "}
          {loading && (
            <Flex width={"100%"} m="auto" justify={"center"} h={"200px"} align={"center"}>
              <Spinner textAlign={"center"} thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            </Flex>
          )}
        </TableContainer>
      )}
    </Box>
  );
};

export default UserAppliedJobs;
