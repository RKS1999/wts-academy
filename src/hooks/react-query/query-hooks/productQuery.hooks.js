import { useMutation, useQuery } from "@tanstack/react-query";
import { useGlobalHooks } from "../../GlobalHooks";
import { PRODUCTS } from "../query-keys/authQuery.keys";
import {
  createProduct,
  deleteProduct,
  fetchProductDetail,
  fetchProducts,
  updateProduct,
} from "../../../Api/ApiHandler";
import { toast } from "react-toastify";

export const useProductCreateMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (response) => {
      const { message, status } = response || {};
      if (status === 200) {
        navigate("/productList");
        toast(message, { type: "success" });
        queryClient.invalidateQueries({
          queryKey: [PRODUCTS],
        });
      } else {
        toast(message, { type: "error" });
      }
    },
  });
};

export const useProductDeleteMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: ({ id }) => deleteProduct(id),
    onSuccess: (response) => {
      const { message, status } = response || {};
      if (status === 200) {
        navigate("/productList");
        toast(message, { type: "success" });
        queryClient.invalidateQueries([PRODUCTS]);
      } else {
        toast(message, { type: "error" });
      }
    },
  });
};

export const useProductUpdateMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (response) => {
      const { message, status } = response || {};
      if (status === 200) {
        navigate("/productList");
        toast(message, { type: "success" });
        queryClient.invalidateQueries([PRODUCTS]);
      } else {
        toast(message, { type: "error" });
      }
    },
  });
};

export const useGetProductQueries = (page, perPage) => {
  return useQuery({
    queryKey: [PRODUCTS, page, perPage],
    queryFn: () => fetchProducts({ page, perPage }),
    keepPreviousData: true,
    staleTime: 5000,
  });
};

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: [PRODUCTS, id],
    queryFn: () => fetchProductDetail(id),
  });
};
