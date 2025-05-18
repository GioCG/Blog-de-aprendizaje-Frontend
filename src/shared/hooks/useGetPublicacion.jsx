import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getPublicacionesByCategory } from "../../services";

export const useGetPublicacionesPorCategoria = (categoria) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPublicaciones = async () => {
    setIsLoading(true);
    try {
      const response = await getPublicacionesByCategory(categoria);
      console.log("📥 Datos recibidos:", response);

      if (response?.data?.publications && Array.isArray(response.data.publications)) {
        setData(response.data.publications); // <- ✅ Esto es lo importante
      } else {
        toast.error("No se encontraron publicaciones.");
        setData([]);
      }
    } catch (error) {
      toast.error("Error al cargar publicaciones");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (categoria) {
      console.log("🔍 Buscando publicaciones para:", categoria);
      fetchPublicaciones();
    }
  }, [categoria]);

  return { data, isLoading, refetch: fetchPublicaciones };
};
