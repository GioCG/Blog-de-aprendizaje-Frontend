import React, { useState } from "react";
import { useGetPublicacionesPorCategoria } from "../shared/hooks/useGetPublicacion";
import { CrearCommitForm } from "./CraeteCommit";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useEditCommit } from "../shared/hooks/useEditCommit";
import { useDeleteCommit } from "../shared/hooks/useDeleteCommit";

export const PublicacionesPorCategoria = ({ categoria }) => {
  const { data: publicaciones, isLoading } = useGetPublicacionesPorCategoria(categoria);
  const [publicacionActiva, setPublicacionActiva] = useState(null);
  const [respuestasActivas, setRespuestasActivas] = useState({});
  const { edit } = useEditCommit();
  const { remove } = useDeleteCommit();

  const handleEditar = async (id) => {
    const nuevoTexto = prompt("Editar comentario:");
    if (nuevoTexto) {
      await edit({ id, textoprincipal: nuevoTexto });
    }
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Estás seguro de eliminar este comentario?")) {
      await remove(id);
    }
  };

  if (isLoading) return <p>Cargando publicaciones...</p>;

  if (!publicaciones || publicaciones.length === 0) {
    return <p>No se encontraron publicaciones para la categoría "{categoria}".</p>;
  }

  return (
    <div>
      <h2>Publicaciones de {categoria.replace("-", " ")}</h2>
      <div className="publicaciones-list">
        {publicaciones.map((pub) => (
          <div key={pub._id} className="publicacion-card">
            <h3>{pub.titulo}</h3>
            <p>{pub.textoprincipal}</p>
            <p><strong>Autor:</strong> {pub.user?.username || "Desconocido"}</p>
            <p>
              <small>
                Publicado {formatDistanceToNow(new Date(pub.createdAt), { addSuffix: true, locale: es })}
              </small>
            </p>

            <div className="comentarios">
              <h4>Comentarios:</h4>
              {pub.commit && pub.commit.length > 0 ? (
                <ul style={{ paddingLeft: 0 }}>
                  {pub.commit.map((comentario) => (
                    <li key={comentario._id} style={{ marginBottom: "1rem" }}>
                      <p>
                        <strong>{comentario.user?.username}:</strong> {comentario.textoprincipal}
                        <br />
                        <small>
                          {formatDistanceToNow(new Date(comentario.createdAt), { addSuffix: true, locale: es })}
                        </small>
                      </p>

                      <div className="flex gap-2 mb-1">
                        <button
                          onClick={() =>
                            setRespuestasActivas((prev) => ({
                              ...prev,
                              [comentario._id]: !prev[comentario._id],
                            }))
                          }
                          className="text-blue-500"
                        >
                          {respuestasActivas[comentario._id] ? "Cancelar respuesta" : "Responder"}
                        </button>

                        <button
                          onClick={() => handleEditar(comentario._id)}
                          className="text-yellow-600"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => handleEliminar(comentario._id)}
                          className="text-red-600"
                        >
                          Eliminar
                        </button>
                      </div>

                      {respuestasActivas[comentario._id] && (
                        <CrearCommitForm
                          titulo={pub.titulo}
                          parentCommitId={comentario._id}
                          onCancel={() => setRespuestasActivas((prev) => ({
                            ...prev,
                            [comentario._id]: false,
                          }))}
                        />
                      )}

                      {comentario.childCommits && comentario.childCommits.length > 0 && (
                        <ul className="respuestas" style={{ marginLeft: "1rem", borderLeft: "2px solid #ccc", paddingLeft: "1rem" }}>
                          {comentario.childCommits.map((respuesta) => (
                            <li key={respuesta._id} style={{ marginBottom: "0.5rem" }}>
                              <p>
                                <strong>{respuesta.user?.username}:</strong> {respuesta.textoprincipal}
                                <br />
                                <small>
                                  {formatDistanceToNow(new Date(respuesta.createdAt), { addSuffix: true, locale: es })}
                                </small>
                              </p>

                              <div className="flex gap-2 mb-1">
                                <button
                                  onClick={() =>
                                    setRespuestasActivas((prev) => ({
                                      ...prev,
                                      [respuesta._id]: !prev[respuesta._id],
                                    }))
                                  }
                                  className="text-blue-500"
                                >
                                  {respuestasActivas[respuesta._id] ? "Cancelar respuesta" : "Responder"}
                                </button>

                                <button
                                  onClick={() => handleEditar(respuesta._id)}
                                  className="text-yellow-600"
                                >
                                  Editar
                                </button>

                                <button
                                  onClick={() => handleEliminar(respuesta._id)}
                                  className="text-red-600"
                                >
                                  Eliminar
                                </button>
                              </div>

                              {respuestasActivas[respuesta._id] && (
                                <CrearCommitForm
                                  titulo={pub.titulo}
                                  parentCommitId={respuesta._id}
                                  onCancel={() => setRespuestasActivas((prev) => ({
                                    ...prev,
                                    [respuesta._id]: false,
                                  }))}
                                />
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
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
