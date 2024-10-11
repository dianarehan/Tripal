import { axios } from "./axios";

export async function createRequest(Body) {
    try {
        console.log("the body is", Body)
        const response = await axios.post("/request", Body);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "An error occurred while creating the request.");
    }
}