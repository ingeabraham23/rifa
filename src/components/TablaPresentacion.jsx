/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import db from "../db";
import html2canvas from "html2canvas";
import "./TablaPresentacion.css"; // Importa el archivo CSS

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from "date-fns/locale/es";
import { registerLocale } from "react-datepicker";

registerLocale("es", es);

function TablaPresentacion() {
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const [personas, setPersonas] = useState([]);
  const [encabezado, setEncabezado] = useState("Rifa de: ");
  const [recaudador, setRecaudador] = useState("Organiza: JoyBoy.");
  const [semana, setSemana] = useState("la rifa se llevara a cabo el día: ");
  const containerRef = useRef(null);

  const fechaActual = new Date(); // Obtiene la fecha actual
  const [fechaSeleccionada, setFechaSeleccionada] = useState(fechaActual); // Estado para la fecha seleccionada en el DatePicker, se inicializa con la fecha en que se esta ejecutando la aplicación

  useEffect(() => {
    async function fetchPersonas() {
      try {
        const data = await db.personas.toArray();
        setPersonas(data);
      } catch (error) {
        console.error(
          "Error al obtener los datos de la tabla de Dexie:",
          error
        );
      }
    }

    async function fetchEncabezado() {
      try {
        const data = await db.encabezado.toArray();
        if (data.length > 0) {
          setEncabezado(data[0].texto);
        }
      } catch (error) {
        console.error(
          "Error al obtener el encabezado de la tabla de Dexie:",
          error
        );
      }
    }

    async function fetchRecaudador() {
      try {
        const data = await db.recaudador.toArray();
        if (data.length > 0) {
          setRecaudador(data[0].texto);
        }
      } catch (error) {
        console.error(
          "Error al obtener el recaudador de la tabla de Dexie:",
          error
        );
      }
    }

    async function fetchSemana() {
      try {
        const data = await db.semana.toArray();
        if (data.length > 0) {
          setSemana(data[0].texto);
        }
      } catch (error) {
        console.error(
          "Error al obtener el recaudador de la tabla de Dexie:",
          error
        );
      }
    }

    fetchPersonas();
    fetchEncabezado();
    fetchRecaudador();
    fetchSemana();
  }, []);

  const obtenerColorFila = (estado) => {
    switch (estado) {
      case 0:
        return "#F41010"; //Fuera de servicio
      case 1:
        return "#AAFF00"; //Activo
      case 2:
        return "#EFEF0F"; //Taller
      case 5:
        return "#FF8503"; //Posturero
      case 6:
        return "white"; //No se le pidio
      case 7:
        return "#000000"; //No quiso dar
      default:
        return "white";
    }
  };

  const obtenerColorTexto = (estado) => {
    switch (estado) {
      case 0:
        return "#000000"; //Fuera de servicio
      case 1:
        return "#000000"; //Activo
      case 2:
        return "#000000"; //Taller
      case 5:
        return "#000000"; //Posturero
      case 6:
        return "#000000"; //No se le pidio
      case 7:
        return "red"; //No quiso dar
      default:
        return "#000000";
    }
  };

  const handleCaptureTable = () => {
    if (containerRef.current) {
      const scale = 4;
      html2canvas(containerRef.current, { scale }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = imgData;
        downloadLink.download =
          encabezado +
          semana +
          fechaSeleccionada.toLocaleDateString("es-MX", opciones);
        downloadLink.click();
      });
    }
  };

  function controlarFechaSeleccionada(fecha) {
    setFechaSeleccionada(fecha);
  }

  const personasConCooperacion = personas.filter(
    (persona) => parseFloat(persona.cooperacion) > 0
  );
  const personasSinCooperacion = personas.filter(
    (persona) => parseFloat(persona.cooperacion) === 0
  );

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <div ref={containerRef}>
        <div className="container">{encabezado}</div>
        <div className="container2">{recaudador}</div>
        <div className="container3">{semana}</div>
        <div className="container">
          Fecha: {fechaSeleccionada.toLocaleDateString("es-MX", opciones)}
        </div>

        <div className="tabla-container">
          <table className="tabla-izquierda">
            <thead>
              <tr>
                <th>Boleto</th>
                <th>Nombre</th>
                <th>Aporte</th>
              </tr>
            </thead>
            <tbody>
              {personas
                .slice(0, Math.ceil(personas.length / 2))
                .map((persona, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: obtenerColorFila(persona.estado),
                      color: obtenerColorTexto(persona.estado),
                    }}
                  >
                    <td>{persona.unidad}</td>
                    <td>{persona.nombre}</td>
                    <td>$ {persona.cooperacion}.00</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="tabla-container-derecha">
          <table className="tabla-derecha">
            <thead>
              <tr>
                <th>Boleto</th>
                <th>Nombre</th>
                <th>Aporte</th>
              </tr>
            </thead>
            <tbody>
              {personas
                .slice(Math.ceil(personas.length / 2))
                .map((persona, index) => (
                  <tr
                    key={persona.unidad}
                    style={{
                      backgroundColor: obtenerColorFila(persona.estado),
                      color: obtenerColorTexto(persona.estado),
                    }}
                  >
                    <td>{persona.unidad}</td>
                    <td>{persona.nombre}</td>
                    <td>$ {persona.cooperacion}.00</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="container-pie">
          Total: ${" "}
          {formatNumberWithCommas(
            personas
              .reduce(
                (total, persona) => total + parseFloat(persona.cooperacion),
                0
              )
              .toFixed(2)
          )}
        </div>
        <div
          className="container-pie2"
          style={{ backgroundColor: "DeepSkyBlue" }}
        >
          Total de Boletos: {personas.length}
        </div>
        <div
          className="container-pie2"
          style={{ backgroundColor: "Chartreuse" }}
        >
          Boletos pagados: {personasConCooperacion.length}
        </div>
        <div className="container-pie2" style={{ backgroundColor: "red" }}>
          Boletos sin pagar: {personasSinCooperacion.length}
        </div>
        <div className="container-pie2" style={{ backgroundColor: "white" }}>
          ©JoyBoy
        </div>
      </div>
      <div className="container-calendar">
        <button onClick={handleCaptureTable}>Capturar Tabla</button>
      </div>
      <div className="container-calendar">
        <DatePicker
          selected={fechaSeleccionada}
          showIcon
          withPortal
          onChange={controlarFechaSeleccionada}
          locale="es"
          onFocus={(e) => {
            e.target.readOnly = true;
            e.target.blur();
          }}
        />
      </div>
    </div>
  );
}

export default TablaPresentacion;
