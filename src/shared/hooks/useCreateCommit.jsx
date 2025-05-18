import { useState } from "react";
import toast from "react-hot-toast";
import { createCommit } from "../../services/api";

export const useCreateCommit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [commitData, setCommitData] = useState(null);

  const submitCommit = async ({ textoprincipal, username, titulo = null, parentCommitId = null }) => {
    setIsLoading(true);
    try {
      const payload = {
        textoprincipal,
        username,
        titulo,
        parentCommitId,
      };

      const result = await createCommit(payload);

      if (result.error) {
        toast.error(result.message || "Error al crear el commit");
      } else {
        toast.success("Commit creado correctamente");
        setCommitData(result.commit);
      }

      return result;
    } catch (error) {
      toast.error("Error inesperado al crear commit");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    commitData,
    create: submitCommit,
  };
};
