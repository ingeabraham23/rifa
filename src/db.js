import Dexie from "dexie";

const database = new Dexie("DatosRifa");
database.version(2).stores({
  personas: "++id, unidad, nombre, cooperacion, estado",
  encabezado: "++id, texto",
  recaudador: "++id, texto",
  semana: "++id, texto"
});

export default database;