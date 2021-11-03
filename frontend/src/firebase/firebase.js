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
import { getStorage, ref, getDownloadURL} from "firebase/storage";
const db = getFirestore(app);

const expedienteCol = collection(db, "expedientes");
const storage = getStorage();

async function getImage(path){
  return getDownloadURL(ref(storage, path))
}

async function getExpedientes(idDoc) {
  if (!idDoc) return [];
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
      img: doc.data().img,
      idDoc: doc.data().idDoc,
    });
  });

  return expedientes;
}

async function setExpediente(expediente, id) {
  let docRef = id ? doc(expedienteCol, id) : doc(expedienteCol);
  await setDoc(docRef, expediente);
}

export { getExpedientes, setExpediente, getImage };
export default db;
