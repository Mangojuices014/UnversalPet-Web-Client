import { api } from "../../utils/api";


export const getAllTypeTool = async () => {
    try {
      const response = await api.get("/tools/tool/get-all-type-tool");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getAllSizes = async () => {
    try {
      const response = await api.get("/tools/tool/get-all-size-tool");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getAllMaterials = async () => {
    try {
      const response = await api.get("/tools/tool/get-all-material-tool");
      return response.data;
    } catch (error) {
      throw error;
    }
  };