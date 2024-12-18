import { api } from "../../utils/api";


export const getAllColorPet = async () => {
    try {
      const response = await api.get("/pet-for-sale/get-all-color-pet");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getAllBreedPet = async () => {
    try {
      const response = await api.get("/pet-for-sale/get-all-breed-pet");
      return response.data;
    } catch (error) {
      throw error;
    }
  };