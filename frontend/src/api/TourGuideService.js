import { axios } from "./axios";

export async function createTourGuide(newUser) {
  try {
   const response= await axios.post("/tourGuide/", newUser);
   return response;
  } catch (error) {
    throw error;
  }
}
export const updateProfile = async (id, Data) => {
  try {
   const response = await axios.put(`/tourGuide/${id}`, Data);
   return response;
  } catch (error) {
    console.error("Error updating your profile:", error);
    throw error;
  }
};
export const getProfileData = async (id) => {
  try {
    const response=await axios.get(`/tourGuide/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetch your profile data:", error);
    throw error;
  }
};

export const getRatings = async (id) => {
  try {
    const response = await axios.get(`/tourGuide/${id}/ratings`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ratings:", error);
    throw error;
  }
};

export const addRating = async (tourGuideID, ratingData) => {
  try {
    const response = await axios.post(`/tourGuide/${tourGuideID}/ratings`, ratingData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error adding rating:", error);
    throw error;
  }
};
