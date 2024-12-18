import { api } from "../utils/api";

export async function addProduct(photo, productData) {
    const formData = new FormData();

    // Thêm dữ liệu sản phẩm
    for (let [key, value] of Object.entries(productData)) {
        formData.append(key, value);
    }


    // Thêm file ảnh nếu có
    if (photo) {
        formData.append("file", photo); // "file" khớp với @RequestParam("file") backend
    }

    try {
        const response = await fetch("http://localhost:9193/api/v1/products/create-product/product", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Failed to create product");
        }

        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

export async function getAllProducts() {
    try {
      const response = await api.get("/products/all-products");
      return response.data;
    } catch (error) {
      throw error;
    }
}


