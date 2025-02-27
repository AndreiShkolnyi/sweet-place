import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOrUpdateCabin } from "../../../../services/apiCabins";

export const useCreateOrEditCabin = ({
  isEditSession = false,
  onSuccessHandler,
  reset,
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ newCabin, id }) => {
      await createOrUpdateCabin(newCabin, id);
    },
    onSuccess: () => {
      toast.success(
        `${isEditSession ? "Cabin updated" : "Cabin created"} successfully`
      );
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset?.();
      onSuccessHandler?.();
    },
    onError: () =>
      toast.error(
        `Cabin could not be ${isEditSession ? "updated" : "created"}`
      ),
  });
};
