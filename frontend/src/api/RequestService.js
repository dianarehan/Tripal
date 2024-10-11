import { axios } from "./axios";

export async function createRequest(Body) {
    try {
        console.log("the body is", Body);
        const response = await axios.post("/request", Body);
        return response.data;
    } catch (error) {
        // Check if error.response and error.response.data exist and provide the correct message
        const errorMessage = error.response?.data?.error || "An error occurred while creating the request.";
        console.log("ERRPR MESSAGE", errorMessage)
        throw new Error(errorMessage);
    }
}
