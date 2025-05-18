import { useParams, useLocation } from "react-router-dom";
import { PublicacionesPorCategoria } from "../../components/ListPublicacion";
import { CrearCommitForm } from "../../components/CraeteCommit";
import "./blogPage.css";

export const BlogCategoriaPage = () => {
  const { categoria } = useParams(); 
  const location = useLocation();
  const categoriaNombre = location.state?.categoriaNombre || categoria;

  return (
    <div className="blog-categoria-page">
      <h1>{categoriaNombre.replace("-", " ")}</h1>
      
      {/* Listado de publicaciones por categoría */}
      <PublicacionesPorCategoria categoria={categoriaNombre} />
      
      {/* Formulario general para agregar un nuevo commit */}
      <section className="crear-commit-section">
        <h2>Agregar nuevo comentario</h2>
        <CrearCommitForm />
      </section>
    </div>
  );
};
