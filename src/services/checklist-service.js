import axiosInstance from './api';

export const getDocumentList = async () => {
  try {
    const res = await axiosInstance.get('/document_list');
    return res.data;
  } catch (error) {
    return 'Error while retriving the data from the api';
  }
};

export const setDocumentStatus = async (status) => {
  try {
    const res = await axiosInstance.post('/document_status', { status });
    return res.data;
  } catch (error) {
    return 'Error while retriving the data from the api';
  }
}