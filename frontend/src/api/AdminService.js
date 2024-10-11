import { axios } from "./axios";

export const getUsers = async () => {
  try {
    const response = await axios.get("/admin/users");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Can't return users", error);
    throw error;
  }
}

export const deleteUser = async (id) => {
  try {
    // Use backticks for template literals
    const response = await axios.delete(`/admin/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};


export const createAdmin = async (name, password) => {
  const requestBody = {
    userName: name,
    password: password
  };
  try {
    const response = await axios.post(`/admin/addAdmin`, requestBody);
    return response.data;
  }
  catch (error) {
    const errorMessage = error.response?.data?.error || "An error occurred while creating the request.";
    console.log("ERRPR MESSAGE", errorMessage)
    throw new Error(errorMessage);
  };
}

export const createGovernor = async (name, password) => {
  const requestBody = {
    userName: name,
    password: password
  };
  try {
    const response = await axios.post(`/governor`, requestBody);
    return response.data;
  }
  catch (error) {
    const errorMessage = error.response?.data?.error || "An error occurred while creating the request.";
    console.log("ERRPR MESSAGE", errorMessage)
    throw new Error(errorMessage);
  }
}