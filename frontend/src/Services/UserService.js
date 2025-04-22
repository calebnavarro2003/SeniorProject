import axios from "axios";

const BASE_URL = "https://api.oslearn.app";

export const fetchUserInfo = async () => {
  try{
    const response = await axios.get(`${BASE_URL}/get-user-info`, {
        withCredentials: true
      })
    return response.data;
  } catch(err){
      throw err;
  }
}

export const fetchUserGrade = async (userId, moduleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/answers/percentage/${userId}/${moduleId}`, { withCredentials: true });
    return response.data.percentage;
  } catch (error) {
    console.error("Error fetching user's grade:", error);
    throw error;
  }
};

export const fetchAllModules = async () => {
  try{
    const response = await axios.get(`${BASE_URL}/module/allmodules`, {
        withCredentials: true
    })
    return response.data;
  }catch(err) {
      throw err;
}
}

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
    const response = await axios.post(`${BASE_URL}/answers/grade`, answers, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error submitting answers:", error);
    throw error;
  }
};

export const fetchUserResponsesForModule = async (userId, moduleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/question-results/user/${userId}/module/${moduleId}`, {
        withCredentials: true
    });
    return response.data;  // Assuming it returns an array of Response objects with all their fields.
  } catch (error) {
    console.error("Error fetching user responses for a given module:", error);
    throw error;
  }
};

export const fetchModuleInfo = async (moduleId) => {
  try {
    const response = await axios.get(`${BASE_URL}/module/${moduleId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching module information for a given module:", error);
    throw error;
  }
}

export const fetchModuleSummary = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/module/summary`, {
      withCredentials: true
    });
    return response.data; // assuming this is a SummaryResponse object
  } catch (error) {
    console.error("Error fetching module summary:", error);
    throw error;
  }
};

export const createModule = async (moduleData) => {
  try {
    const response = await axios.post(`${BASE_URL}/module/create`, moduleData, {
      withCredentials: true
    });
    return response.data; // newly created Module
  } catch (error) {
    console.error("Error creating module:", error);
    throw error;
  }
};

export const updateModule = async (updateData) => {
  try {
    const response = await axios.post(`${BASE_URL}/module/update`, updateData, {
      withCredentials: true
    });
    return response.data; // updated Module
  } catch (error) {
    console.error("Error updating module:", error);
    throw error;
  }
};