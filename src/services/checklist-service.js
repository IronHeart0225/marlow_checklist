import axiosInstance from './api';

export const getDocumentList = async () => {
  try {
    const res = await axiosInstance.get('/document_list');
    return res.data;
  } catch (error) {
    return error;
  }
};

export const setDocumentStatus = async (status) => {
  try {
    /** ignore status in mock api */
    const res = await axiosInstance.post('/document_status', { status: 'Done' });
    const { status, data } = res;
    return { code: status, data };
  } catch (error) {
    return error;
  }
}
