import api from './axios';

//announcements API calls
export const fetchEvents = async () => {
  try {
    const response = await api.get("/announcements");
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }};

export const getSchoolDetails = async(id)=>{
  const response = await api.get(`/schools/${id}`)
  return response.data
}

export const viewEvent = async (eventId) => {
  try {
    const response = await api.get(`/announcements/${eventId}`);  
    return response.data;
    } catch (error) {
    console.error("Error viewing event:", error);
    throw error;
    }};