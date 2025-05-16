import React from "react";
import { useGetPublicacion } from "../shared/hooks/useGetPublicacion"; 

export const PublicacionDetail = ({ id }) => {
  const { data, isLoading, refetch } = useGetPublicacion(id);

  if (isLoading) return <p>Cargando publicación...</p>;

  if (!data) return <p>No se encontró la publicación.</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <button onClick={refetch}>Recargar</button>
    </div>
  );
};
