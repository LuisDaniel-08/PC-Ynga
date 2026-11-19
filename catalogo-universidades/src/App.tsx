import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

interface Universidad {
  name: string;
  country: string;
  domains: string[];
  web_pages: string[];
}

function App() {
  const [universidades, setUniversidades] = useState<Universidad[]>([]);
  const [busqueda, setBusqueda] = useState<string>("");
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(function () {
    axios
      .get<Universidad[]>(
        "https://api.allorigins.win/raw?url=" +
          encodeURIComponent("http://universities.hipolabs.com/search?country=Peru")
      )
      .then(function (respuesta) {
        setUniversidades(respuesta.data);
        setCargando(false);
      })
      .catch(function (error) {
        console.error("Error al cargar universidades:", error);
        setCargando(false);
      });
  }, []);

  function manejarCambioBusqueda(evento: React.ChangeEvent<HTMLInputElement>) {
    setBusqueda(evento.target.value);
  }

  const universidadesFiltradas = universidades.filter(function (uni) {
    return uni.name.toLowerCase().includes(busqueda.toLowerCase());
  });

  return (
    <div
      style={{
        padding: "24px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        textAlign: "left",
      }}
    >
      <h1 style={{ lineHeight: 1.2, marginBottom: "16px" }}>
        Catálogo de Universidades del Perú (YNGA MATOS)
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Escribe el nombre de una universidad (ej. San Marcos, UNI, UPC)..."
          value={busqueda}
          onChange={manejarCambioBusqueda}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {cargando ? (
        <p>Cargando universidades...</p>
      ) : (
        <div>
          <p>Mostrando {universidadesFiltradas.length} resultados</p>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {universidadesFiltradas.map(function (uni, index) {
              return (
                <li
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "15px",
                    marginBottom: "10px",
                  }}
                >
                  <h3 style={{ margin: "0 0 8px 0" }}>{uni.name}</h3>
                  <p style={{ margin: "4px 0" }}>
                    <strong>Dominio:</strong> {uni.domains[0]}
                  </p>
                  <a
                    href={uni.web_pages[0]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visitar sitio web
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;