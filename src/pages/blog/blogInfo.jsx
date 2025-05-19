import { useParams, useLocation } from "react-router-dom";
import { PublicacionesPorCategoria } from "../../components/ListPublicacion";
import { SidebarDemo } from "../../components/nanvbars/sidevbar";
import "./blogPage.css";

export const BlogCategoriaPage = () => {
  const { categoria } = useParams(); 
  const location = useLocation();
  const categoriaNombre = location.state?.categoriaNombre || categoria;

  return (
    <div className="blog-layout">
      
        <SidebarDemo />
      
      <div className="blog-content">
        <h1>{categoriaNombre.replace("-", " ")}</h1>
        <PublicacionesPorCategoria categoria={categoriaNombre} />
      </div>
    </div>
  );
};
