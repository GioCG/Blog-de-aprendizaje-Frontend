import React, { useState } from "react";
import { useGetPublicacionesPorCategoria } from "../shared/hooks/useGetPublicacion";
import { CrearCommitForm } from "./CraeteCommit"; // corregí el nombre del archivo importado

// Función para convertir lista plana de comentarios a árbol
const agruparComentarios = (comentarios) => {
  const mapa = new Map();
  comentarios.forEach(c => mapa.set(c._id, { ...c, subcommits: [] }));

  const comentariosRaiz = [];

  comentarios.forEach(c => {
    if (c.parentCommit) {
      const padre = mapa.get(c.parentCommit);
      if (padre) padre.subcommits.push(mapa.get(c._id));
    } else {
      comentariosRaiz.push(mapa.get(c._id));
    }
  });

  return comentariosRaiz;
};

// Componente recursivo para mostrar un comentario y sus respuestas
const Comentario = ({ comentario, titulo, setRespuestasActivas, respuestasActivas }) => {
  return (
    <li style={{ marginBottom: "10px", marginLeft: comentario.parentCommit ? "20px" : "0" }}>
      <strong>{comentario.user?.username || "Anónimo"}:</strong> {comentario.textoprincipal}

      <div style={{ marginTop: "4px" }}>
        <button
          onClick={() =>
            setRespuestasActivas((prev) => ({
              ...prev,
              [comentario._id]: !prev[comentario._id],
            }))
          }
        >
          {respuestasActivas[comentario._id] ? "Cancelar respuesta" : "Responder"}
        </button>

        {respuestasActivas[comentario._id] && (
          <CrearCommitForm
            titulo={titulo}
            parentCommitId={comentario._id}
          />
        )}
      </div>

      {comentario.subcommits && comentario.subcommits.length > 0 && (
        <ul style={{ marginTop: "8px" }}>
          {comentario.subcommits.map((sub) => (
            <Comentario
              key={sub._id}
              comentario={sub}
              titulo={titulo}
              setRespuestasActivas={setRespuestasActivas}
              respuestasActivas={respuestasActivas}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const PublicacionesPorCategoria = ({ categoria }) => {
  const { data: publicaciones, isLoading, refetch } = useGetPublicacionesPorCategoria(categoria);

  const [publicacionActiva, setPublicacionActiva] = useState(null);
  const [respuestasActivas, setRespuestasActivas] = useState({});

  if (isLoading) return <p>Cargando publicaciones...</p>;

  if (!publicaciones || publicaciones.length === 0) {
    return <p>No se encontraron publicaciones para la categoría "{categoria}".</p>;
  }

  return (
    <div>
      <h2>Publicaciones de {categoria.replace("-", " ")}</h2>
      <button onClick={refetch}>Recargar publicaciones</button>

      <div className="publicaciones-list">
        {publicaciones.map((pub) => (
          <div key={pub._id} className="publicacion-card">
            <h3>{pub.titulo}</h3>
            <p>{pub.textoprincipal}</p>
            <p><strong>Autor:</strong> {pub.user?.username || "Desconocido"}</p>
            <p><strong>Categoría:</strong> {pub.categori}</p>
            <p><small>Publicado el: {new Date(pub.createdAt).toLocaleDateString()}</small></p>

            <div className="comentarios">
              <h4>Comentarios:</h4>
              {pub.commit && pub.commit.length > 0 ? (
                <ul>
                  {agruparComentarios(pub.commit).map((comentario) => (
                    <Comentario
                      key={comentario._id}
                      comentario={comentario}
                      titulo={pub.titulo}
                      setRespuestasActivas={setRespuestasActivas}
                      respuestasActivas={respuestasActivas}
                    />
                  ))}
                </ul>
              ) : (
                <p>No hay comentarios aún.</p>
              )}
            </div>

            <button
              onClick={() => setPublicacionActiva(publicacionActiva === pub._id ? null : pub._id)}
              className="btn-comentario"
            >
              {publicacionActiva === pub._id ? "Cancelar" : "Agregar comentario"}
            </button>

            {publicacionActiva === pub._id && (
              <div className="formulario-crear-commit">
                <CrearCommitForm titulo={pub.titulo} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
