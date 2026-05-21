import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosSecure from "../api/axiosSecure";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    const id = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => axiosSecure.interceptors.response.eject(id);
  }, [navigate, logOut]);

  return axiosSecure;
};

export default useAxiosSecure;
