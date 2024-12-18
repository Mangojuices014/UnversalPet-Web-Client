import { api } from "../../utils/api";


export const getAllTypeMedicine = async () => {
  try {
    const response = await api.get("/medicines/medicine/get-all-type-medicine");
    return response.data;
  } catch (error) {
    throw error;
  }
};