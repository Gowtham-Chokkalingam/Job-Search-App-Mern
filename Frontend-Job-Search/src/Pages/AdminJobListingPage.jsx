import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Box, useDisclosure, useToast } from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, getJobListAction } from "../Redux/Actions/jobAction";
import { getAnimationData } from "@motionone/dom";
import EditJobModal from "../Components/Modals/EditJobModal";
import { useNavigate } from "react-router-dom";
let bgImg = 'https://wallpaperaccess.com/full/459817.jpg'
const AdminJobListingPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editId, setEditId] = useState(0);

  const { loading, jobs } = useSelector((state) => state.JobList);

  const { success } = useSelector((state) => state.JobDelete);

  const { editStauts } = useSelector((state) => state.EditJob);
  const { loginStatus, token } = useSelector((state) => state.UserLogin);

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

  function getData() {
    dispatch(getJobListAction());
  }

  useEffect(() => {
    if (!loginStatus) {
      navigate("/Login");
    } else {
      getData();
    }
  }, [success, editStauts, loginStatus]);

  const handleDelete = (id) => {
    dispatch(deleteNoteAction(id, Toaster));
  };
  const handleEdit = (id) => {
    setEditId(id);
    onOpen();
  };
  return (
    <Box w={"100%"} m="auto" minH={"100vh"} bgImage={bgImg} p='4'>
      <TableContainer px={"10"}>
        <Table variant="simple" colorScheme="red" w={"80%"} m='auto'>
          <TableCaption>List of Job Posted</TableCaption>
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Company</Th>
              <Th>Role</Th>
              <Th>Location</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!loading &&
              jobs &&
              jobs.jobsList?.map((ele, i) => {
                return (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td>{ele.companyName}</Td>
                    <Td>{ele.position}</Td>
                    <Td>{ele.location}</Td>
                    <Td>
                      <CiEdit size={"30px"} onClick={() => handleEdit(ele._id)}></CiEdit>
                    </Td>
                    <Td>
                      <MdOutlineDeleteOutline
                        onClick={() => {
                          handleDelete(ele._id);
                        }}
                        size={"30px"}
                      ></MdOutlineDeleteOutline>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      <EditJobModal getNewData={getData} id={editId} isOpen={isOpen} onOpen={onOpen} onClose={onClose}></EditJobModal>
    </Box>
  );
};

export default AdminJobListingPage;
