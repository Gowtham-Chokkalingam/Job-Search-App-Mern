import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Alert, AlertIcon } from "@chakra-ui/react";
function PrivateRoute({ children }) {
  const { loginStatus } = useSelector((state) => state.UserLogin);

  if (!loginStatus) {
    return (
      <>
        <Alert status="warning">
          <AlertIcon />
          Login To Access This Page
        </Alert>
        <Navigate to="/Login"></Navigate>;
      </>
    );
  }
  return children;
}

export default PrivateRoute;
