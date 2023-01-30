import { Box, Collapse, Flex, Image, Input, Select, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useClickOutside } from "react-click-outside-hook";
import { useSelector } from "react-redux";
import { API_URL } from "../API/api";
import { useDebounce } from "../hooks/debounceHook";
import ShowSearchResults from "./ShowSearchResults";
let searchImg = "https://indiacompanyincorporation.com/wp-content/uploads/2020/12/Company-NameSearch-min.png";
const SearchAndFilter = ({ handleFilter }) => {
  const [isExpanded, setExpanded] = useState(false);
  const [qurey, setQurey] = useState("");
  const [data, setData] = useState([]);

  const API = API_URL;
  const { loading, jobs } = useSelector((state) => state.JobList);

  const [parentRef, isClickedOutSide] = useClickOutside();
  const [jobInCity, setJobInCity] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [found, setFound] = useState(false);

  const expandedContainer = () => {
    setExpanded(true);
  };
  useEffect(() => {
    if (isClickedOutSide) {
      setExpanded(false);
      setQurey("");
      setJobInCity([]);
    }

    if (jobs) {
      setData(jobs.jobsList);
    }
  }, [isClickedOutSide, jobs, data]);

  const handleChange = (e) => {
    setQurey(e.target.value);
  };

  const prepareSearchQuery = (query) => {
    const url = `${API}/getJobByCity?name=${query}`;
    return encodeURI(url);
  };

  //> Api call
  const searchTvShow = async () => {
    if (!qurey || qurey.trim() === "") {
      setJobInCity([]);
      return;
    }
    setLoading(true);

    const URL = prepareSearchQuery(qurey);

    const response = await axios.get(URL).catch((err) => {
      console.log("err:", err.message);
    });

    if (response) {
      setTimeout(() => {
        setJobInCity(response.data);
        setFound(true);
        setLoading(false);
      }, 2000);
    }
    if (response.data && response.data.length === 0) {
      setTimeout(() => {
        setLoading(false);
        setFound(false);
      }, 1200);
    }
  };
  //> Customhook Debounce --> to delaying the continues api call while user typing in input

  useDebounce(qurey, 500, searchTvShow);

  return (
    <Flex gap="4" w={"100%"} justify="space-between">
      <Select
     
        w={"20%"}
        h={"40px"}
        variant="outline"
        bg="white"
        color={"black"}
        onChange={(e) => {
          handleFilter(e.target.value);
        }}
        placeholder="Select Position"
        name="position"
      >
        <option value="all">All Role</option>
        <option value="Senior Software Engineer">Senior Software Engineer</option>
        <option value="Senior Application Engineer">Senior Application Engineer</option>
        <option value="Haskell and Pure Script Dev">Haskell and Pure Script Dev</option>
        <option value="Remote DevOps Engineer">Remote DevOps Engineer</option>
        <option value="Midlevel Back End Engineer">Midlevel Back End Engineer</option>
        <option value="Desktop Support Manager">Desktop Support Manager</option>
      </Select>
      <Box w={"50%"} ref={parentRef}>
        <Input
          variant="filled"
          type="text"
          placeholder="Search By City"
          value={qurey}
          name="query"
          onChange={handleChange}
          onFocus={expandedContainer}
        ></Input>
        <Collapse in={isExpanded} animateOpacity>
          <Box p="40px" color="white" mt="4" bg={"#3D1766"} rounded="md" shadow="md" h={"160px"} overflowY={"auto"}>
            {!isLoading ? (
              found && jobInCity.length > 0 ? (
                jobInCity?.map((ele, i) => {
                  return <ShowSearchResults {...ele} index={i} key={ele._id}></ShowSearchResults>;
                })
              ) : (
                <Flex flexDir={"column"} align={"center"} h="100px">
                  <Image boxSize={"100%"} objectFit="cover" src={searchImg} alt="searchImg"></Image>
                  <Text textAlign={"center"}>{found ? "Enter City Name To Search Company" : "No data Found"} </Text>
                </Flex>
              )
            ) : (
              <Flex flexDir={"column"} align={"center"} >
                <Spinner textAlign={"center"} thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />

                <Text textAlign={"center"}>Loading </Text>
              </Flex>
            )}
          </Box>
        </Collapse>
      </Box>
    </Flex>
  );
};

export default SearchAndFilter;
