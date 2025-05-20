import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useDeleteCommit = () => {
  const [isLoading, setIsLoading] = useState(false);

  const remove = async (id) => {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("No hay token disponible. Inicia sesión.");
        return false;
      }

      const url = `${import.meta.env.VITE_API_URL}/commits/${id}`;
      console.log("Eliminando commit con ID:", id);
      console.log("URL:", url);

      const { data } = await axios.delete(url, {
        headers: {
          "x-token": token,
        },
      });

      if (!data?.success) {
        toast.error(data?.msg || "Error al eliminar el commit");
        return false;
      }

      toast.success(data.msg || "Commit eliminado con éxito");
      return true;
    } catch (error) {
      console.error("Error al eliminar:", error);
      if (error.response?.status === 404) {
        toast.error("Commit no encontrado (404)");
      } else {
        toast.error(error.response?.data?.msg || "Error al eliminar el commit");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { remove, isLoading };
};
