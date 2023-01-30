import { Box, Grid, GridItem, VStack, Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchAndFilter from "../Components/SearchAndFilter";
import UserJobListCard from "../Components/UserJobListCard";
import { companiesImg, nodataFound } from "../data/images";
import { getJobListAction } from "../Redux/Actions/jobAction";
import { appliedJobListReset, getAppliedJobAction, jobApplyAction } from "../Redux/Actions/jobAppliedAction";
import { Image, Spinner, useToast } from "@chakra-ui/react";
import { useCallback } from "react";
let nodataFoundImg = nodataFound;
let bgImg = "https://4kwallpapers.com/images/wallpapers/outrun-neon-dark-background-purple-3440x1440-4523.jpg";
let loadingImg = "https://i.vimeocdn.com/video/1146040420-8f3a3a1123505326c53195e12cd6acd472f07888341127f13add2c5380d51682-d_640x360.jpg";
const UserJobsPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const imgs = companiesImg;
  const { loading, jobGetStatus, jobs } = useSelector((state) => state.JobList);

  const { loginStatus, token } = useSelector((state) => state.UserLogin);

  const { jobAppliedListStatus, response: appliedJobArry } = useSelector((state) => state.AppliedJobs);

  const { appliedStatus, response: applyResponse, applyLoding } = useSelector((state) => state.JobApply);

  const [filterLoading, setFilterLoding] = useState(false);
  const [jobsData, setJobsData] = useState([]);
  const [appliedBtnCheck, setAppliedBtnCheck] = useState([]);
  const [idx, setI] = useState(null);
  const dispatch = useDispatch();

  async function getData() {
    dispatch(getJobListAction());
  }

  const handleApply = (id) => {
    dispatch(jobApplyAction(id, Toaster));
  };

  const getAppliedJobData = () => {
    dispatch(getAppliedJobAction());
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
  useEffect(() => {
    if (!jobGetStatus) {
      getData();
      getAppliedJobData();
    }
    if (jobGetStatus) {
      setJobsData(jobs.jobsList);
    }
    if (!loginStatus) {
      navigate("/Login");
    }
    if (appliedStatus) {
      setI(null);

      getAppliedJobData();
    }
    if (jobAppliedListStatus) {
      let found = appliedJobArry.map((ele) => ele.job._id);
      setAppliedBtnCheck(found);
      // dispatch(appliedJobListReset());
    }
  }, [jobGetStatus, jobAppliedListStatus, appliedStatus, loginStatus]);

  const handleFilter = (value) => {
    setFilterLoding(true);
    if (value === "all") {
      setTimeout(() => {
        setJobsData(jobs.jobsList);
        setFilterLoding(false);
      }, 2000);
    } else {
      const filteredData = jobs.jobsList.filter((ele) => {
        return ele.position.toLowerCase().includes(value.toLowerCase());
      });
      setTimeout(() => {
        setJobsData(filteredData);

        setFilterLoding(false);
      }, 2000);
    }
  };
  function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <Box w={"100%"} m="auto" minHeight={"120vh"} bgImage={bgImg} p="6">
      <SearchAndFilter handleFilter={handleFilter}></SearchAndFilter>

      <Grid w={"90%"} m="auto" templateColumns={{ lg: "repeat(3,1fr)", md: "repeat(3,1fr)", sm: "repeat(1,1fr)" }} gap={6} my="6">
        {!loading && jobs && jobsData.length > 0 && !filterLoading ? (
          jobsData?.map((ele, i) => {
            let applied = appliedBtnCheck.includes(ele._id);
            return (
              <GridItem w="100%" h="100%" key={ele._id} align="center">
                <UserJobListCard
                  applyLoding={applyLoding}
                  {...ele}
                  handleApply={handleApply}
                  index={i}
                  setI={setI}
                  idx={idx}
                  applyBtn={applied ? "Applied" : "Apply"}
                  imgData={imgs[i]}
                ></UserJobListCard>
              </GridItem>
            );
          })
        ) : !filterLoading ? (
          <GridItem colSpan={3} m="auto" textAlign={"center"}>
            <Text as="b">No Jobs Found</Text>
            <Image boxSize="lg" src={nodataFoundImg} alt="nodataFoundImg"></Image>
          </GridItem>
        ) : (
          <GridItem colSpan={4} m="auto" justify="center" alignContent={"center"}>
            <Box>
              <Spinner textAlign={"center"} thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
            </Box>
            <Text as="b" mt="4">
              Loading....
            </Text>
          </GridItem>
        )}
      </Grid>
    </Box>
  );
};

export default UserJobsPage;
