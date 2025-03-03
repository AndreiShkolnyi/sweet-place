import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../../../services/apiAuth";
import toast from "react-hot-toast";

export const useSignUp = () => {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("Sign Up Success");
    },
  });

  return { signup, isLoading };
};
