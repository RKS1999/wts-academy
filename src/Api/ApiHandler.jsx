import { AxiosInstance } from "./AxiosInstance";
import { endPoints } from "./Endpoints";

export const userSignUp = async (input) => {
  console.log(input);
  try {
    const { data } = await AxiosInstance.post(
      `${endPoints?.users?.signUp}`,
      input
    );
    return data;
  } catch (error) {
    console.error("Error occured while Signing Up:", error);
    throw error;
  }
};

export const userSignIn = async (input) => {
  try {
    const { data } = await AxiosInstance.post(
      `${endPoints.users.signin}`,
      input
    );
    return data;
  } catch (error) {
    console.error("Error occured while singing up:", error);
    throw error;
  }
};

export const createProduct = async (input) => {
  try {
    const { data } = await AxiosInstance.post(endPoints.product.create, input);
    return data;
  } catch (error) {
    console.error("Error occurred while creating product:", error);
    throw error;
  }
};

export const fetchProducts = async ({ page, perPage }) => {
  try {
    const { data } = await AxiosInstance.post(endPoints.product.list, {
      params: { page, perPage },
    });
    return data;
  } catch (error) {
    console.error("Error occurred while fetching products:", error);
    return data;
  }
};

export const fetchProductDetail = async (productId) => {
  try {
    const { data } = await AxiosInstance.get(
      `${endPoints.product.detail}/${productId}`
    );
    return data?.data;
  } catch (error) {
    console.error("Error occured while fetching product details:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data } = await AxiosInstance.post(`${endPoints.product.remove}`, {
      id,
    });
    return data;
  } catch (error) {
    console.error("Error occurred while deleting product:", error);
    throw error;
  }
};

export const updateProduct = async (updatedData) => {
  try {
    const { data } = await AxiosInstance.post(
      `${endPoints.product.update}`,
      updatedData
    );
    return data;
  } catch (error) {
    console.error("Error occurred while updating prooduct:", error);
    throw error;
  }
};
