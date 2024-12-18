import { api } from "../../utils/api";


export const getAllMaterialClothing = async () => {
    try {
      const response = await api.get("/clothing/get-all-material-clothing");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getAllColorClothing = async () => {
    try {
      const response = await api.get("/clothing/get-all-color-clothing");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getAllTargetSpecies = async () => {
    try {
      const response = await api.get("/clothing/get-all-target-species");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getAllStyle = async () => {
    try {
      const response = await api.get("/clothing/get-all-style");
      return response.data;
    } catch (error) {
      throw error;
    }
  };
