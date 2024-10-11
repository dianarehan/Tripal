import { axios } from "./axios";

export async function createTourist(newUser) {
  try {
    await axios.post("/createTourist", newUser);
  } catch (error) {
    const errorMessage = error.response?.data?.error || "An error occurred while creating the request.";
    console.log("ERRPR MESSAGE", errorMessage)
    throw new Error(errorMessage);

  }
}
export async function getTouristInformation(id) {
  try {
    const response = await axios.get(`/getTouristInfo/${id}`);
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}
export async function updateTouristInformation(id, body) {
  try {
    console.log("the body ", body)
    const response = await axios.put(`/updateTourist/${id}`, body);
    console.log("after update", response.data)
    return response.data;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}
