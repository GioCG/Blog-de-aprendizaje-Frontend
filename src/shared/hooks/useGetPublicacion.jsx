import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getPublicacion } from "../../services"; 

export const useGetPublicacion = (id) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPublicacion = async () => {
    setIsLoading(true);
    try {
      const response = await getPublicacion(id);
      if (response.error) {
        toast.error(response.error?.response?.data || "Error al cargar publicación");
      } else {
        setData(response.data);
      }
    } catch (error) {
      toast.error("Error al cargar publicación");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPublicacion();
    }
  }, [id]);

  return { data, isLoading, refetch: fetchPublicacion };
};
