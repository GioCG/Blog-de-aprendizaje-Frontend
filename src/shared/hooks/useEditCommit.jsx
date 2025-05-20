import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useEditCommit = () => {
  const [isLoading, setIsLoading] = useState(false);

  const edit = async ({ id, textoprincipal }) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Token no encontrado. Inicia sesión.");
        return null;
      }

      if (!id?.trim() || !textoprincipal?.trim()) {
        toast.error("ID o texto del commit no pueden estar vacíos.");
        return null;
      }

      const url = `${import.meta.env.VITE_API_URL}/commits/${id}`;

      if (import.meta.env.DEV) {
        console.log("Editando commit con ID:", id);
        console.log("URL:", url);
      }

      const { data } = await axios.put(
        url,
        { textoprincipal },
        {
          headers: {
            "x-token": token,
          },
        }
      );

      if (!data?.success) {
        toast.error(data.msg || "Error al editar el commit");
        return null;
      }

      toast.success(data.msg || "Commit editado con éxito");
      return data.commit;

    } catch (error) {
      console.error("Error al editar el commit:", error);

      if (error.response?.status === 404) {
        toast.error("Commit no encontrado (404)");
      } else {
        toast.error(error.response?.data?.msg || "Error al editar el commit");
      }

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { edit, isLoading };
};
