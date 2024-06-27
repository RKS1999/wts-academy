import { useMutation } from "@tanstack/react-query";
import { useGlobalHooks } from "../../GlobalHooks";
import { userSignIn, userSignUp } from "../../../Api/ApiHandler";
import { toast } from "react-toastify";

export const useUserSignInMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();
  return useMutation({
    mutationFn: userSignIn,
    onSuccess: (response) => {
      const {
        token,
        status,
        message,
        data: { first_name, last_name, email, profile_pic },
      } = response || {};
      if (status === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("fname", first_name);
        localStorage.setItem("lname", last_name);
        localStorage.setItem("email", email);
        localStorage.setItem("propic", profile_pic);
        navigate("/ProductList");
        toast(message, "success");
      } else {
        navigate("/signin");
        toast(message, "error");
      }
      queryClient.invalidateQueries({ queryKey: [USERS] });
    },
  });
};

export const useUserSignUpMutation = () => {
  const { queryClient, navigate } = useGlobalHooks();

  return useMutation({
    mutationFn: userSignUp,
    onSuccess: (response) => {
      const { status, message } = response || {};
      if (!!status && status === 200) {
        navigate("/signin");
        toast(message, "success");
        queryClient.invalidateQueries({ queryKey: [USERS] });
      } else {
        navigate("/signup");
        toast(message, "success");
      }
    },
  });
};
