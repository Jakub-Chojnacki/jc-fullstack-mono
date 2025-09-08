import toast from "react-hot-toast";

import apiClient from "@/api-client";

function useUploadFile() {
  const mutation = apiClient.file.upload.useMutation({
    onError: (error) => {
      if (error.status === 429) {
        toast.error("Too many uploads. Please try again later.");
      }
      else if (error.status === 400) {
        toast.error("Invalid file. Please check file size and format.");
      }
      else {
        toast.error("There was an error while uploading the file!");
      }
    },
    onSuccess: () => {
      toast.success("File uploaded successfully!");
    },
  });

  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return mutation.mutate({
      body: formData,
    });
  };

  return {
    ...mutation,
    uploadFile,
  };
}

export default useUploadFile;
