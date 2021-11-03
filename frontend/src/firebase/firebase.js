import app from "./fire";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
const db = getFirestore(app);

const expedienteCol = collection(db, "expedientes");

async function getExpedientes(idDoc) {
  const q = query(
    expedienteCol,
    where("idDoc", "==", idDoc),
    orderBy("nombre")
  );
  const expSnapshot = await getDocs(q);
  let expedientes = [];

  expSnapshot.forEach((doc) => {
    expedientes.push({
      id: doc.id,
      nombre: doc.data().nombre,
      correo: doc.data().correo,
      direccion: doc.data().direccion,
      telefono: doc.data().telefono,
      fechaNac: doc.data().fechaNac,
      genero: doc.data().genero,
      telEmerg: doc.data().telEmerg,
      idDoc: doc.data().idDoc,
    });
  });

  return expedientes;
}

async function setExpediente(expediente, id) {
  let docRef = id ? doc(expedienteCol, id) : doc(expedienteCol);
  await setDoc(docRef, expediente);
}

export { getExpedientes, setExpediente };
export default db;
