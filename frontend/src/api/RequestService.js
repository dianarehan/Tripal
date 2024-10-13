import { axios } from "./axios";

export async function createRequest(Body) {
    try {
        console.log("The body is", Body);
        const response = await axios.post("/request", Body);
        return response.data;
    } catch (error) {
        // Check if error.response and error.response.data exist and provide the correct message
        const errorMessage = error.response?.data?.error || "An error occurred while creating the request.";
        console.log("ERROR MESSAGE", errorMessage);
        throw new Error(errorMessage);
    }
}


export async function acceptRequest(id) {
    try {
        console.log("Accepting request with ID:", id);

        const response = await axios.put(`/request/${id}`, { status: "accepted" });

        return response.data;
    } catch (error) {

        const errorMessage = error.response?.data?.error || "An error occurred while accepting the request.";
        console.log("ERROR MESSAGE", errorMessage);
        throw new Error(errorMessage);
    }
}


export async function getRequest(id) {
    try {
        console.log("Retrieving request with ID:", id);
        const response = await axios.get(`/request/${id}`);
        return response.data;
    } catch (error) {
        // Check if error.response and error.response.data exist and provide the correct message
        const errorMessage = error.response?.data?.error || "An error occurred while retrieving the request.";
        console.log("ERROR MESSAGE", errorMessage);
        throw new Error(errorMessage);
    }
}
