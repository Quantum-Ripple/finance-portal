import api from './axios'

export const getStudent = async() => {
  try {
    const response = await api.get("/student/");
    return response.data;
  } catch (error) {
    console.error("Error fetching student:", error);
    throw error;
  }

}

export const getParent = async () => {
  try {
    const response = await api.get("/parent/profile/");
    return response.data;
  } catch (error) {
    console.error("Error fetching parent:", error);
    throw error;
  }
}


export const getStudentGrades = async (studentId) => {
  try {
    const response = await api.get(`/parent/student/${studentId}/grades/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student grades:", error);
    throw error;
  }
};
