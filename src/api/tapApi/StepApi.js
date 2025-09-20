import {api} from "../Interceptor"

export const getSteps = async () => {
  
  try {
    const response = await api.get('/steps');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'خطا در دریافت مراحل');
  }
};

export const getStep = async (id) => {
  try {
    const response = await api.get(`/steps/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'خطا در دریافت مرحله');
  }
};

export const createStep = async (step) => {
  try {
    const response = await api.post('/steps', step);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'خطا در ایجاد مرحله');
  }
};

export const updateStep = async (step) => {
  try {
    const response = await api.put(`/steps/${step.id}`, step);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'خطا در بروزرسانی مرحله');
  }
};

export const deleteStep = async (id) => {
  try {
    const response = await api.delete(`/steps/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'خطا در حذف مرحله');
  }
};