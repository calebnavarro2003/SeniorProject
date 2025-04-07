import axios from "axios";

const BASE_URL = "http://localhost:8080";


export const fetchUserEmail = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-user-info`, { withCredentials: true });
    return response.data.email;
  } catch (error) {
    console.error("Error fetching user info!", error);
    throw error;
  }
};

export const fetchUserId = async (email) => {
  try {
    const encodedEmail = encodeURIComponent(email);
    const response = await axios.get(`${BASE_URL}/${encodedEmail}/id`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching user ID!", error);
    throw error;
  }
};

export const fetchUserGrade = async (userId, moduleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/answers/percentage/${userId}/${moduleId}`, { withCredentials: true });
    return response.data.percentage;
  } catch (error) {
    console.error("Error fetching user's grade:", error);
    throw error;
  }
};

export const fetchAllModuleGrades = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/answers/grades/${userId}`, { withCredentials: true });
      return response.data; // Assume it returns an array of { moduleId, percentage }
    } catch (error) {
      console.error("Error fetching all modules grades:", error);
      throw error;
    }
  };

export const fetchModuleAnswers = async (moduleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/answers/${moduleId}`, { withCredentials: true });
    return response.data.map(({ questionId, letter }) => ({ questionId, letter }));
  } catch (error) {
    console.error("Error fetching answers for a given module", error);
    throw error;
  }
};

export const fetchModuleDetails = async (moduleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/questions/module/${moduleId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching module details!", error);
    throw error;
  }
};

export const submitAnswers = async (answers) => {
  try {
    const response = await axios.post(`${BASE_URL}/answers/grade`, answers, { withCredentials: true, headers: { 'Content-Type': 'application/json' } });
    return response.data;
  } catch (error) {
    console.error("Error submitting answers:", error);
    throw error;
  }
};