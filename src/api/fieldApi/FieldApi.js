import {api} from "../Interceptor"

export const getFields = async (stepId) => {
  try {
    const response = await api.get(`/steps/${stepId}/feildsData?stepId=${stepId}`)
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'خطا در دریافت فیلدها')
  }
};

export const getField = async (id) => {
  try {
    const response = await api.get(`/steps/${stepId}/feildsData/${id}`)
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'خطا در دریافت فیلد')
  }
}

export const createField = async (field) => {
  try {
    const response = await api.post(`/steps/${field.stepId}/feildsData`, field);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'خطا در ایجاد فیلد')
  }
}

export const updateField = async (field) => {
  try {
    const response = await api.put(`/steps/${field.stepId}/feildsData/${field.id}`, field);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'خطا در بروزرسانی فیلد')
  }
}

export const deleteField = async ({fieldId, stepId}) => {
  try {
    const response = await api.delete(`/steps/${stepId}/feildsData/${fieldId}}`)
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'خطا در حذف فیلد')
  }
}