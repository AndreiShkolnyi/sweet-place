import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../../../services/apiSettings";

export const useUpdateSetting = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      // queryClient.invalidateQueries({
      //   queryKey: ["settings"],
      // });
    },
    onError: () => toast.error("Settings could not be updated"),
  });
};
