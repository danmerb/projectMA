import app from "./fire";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  query,
  updateDoc,
  deleteDoc,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const db = getFirestore(app);

const expedienteCol = collection(db, "expedientes");
const citaCol = collection(db, "citas");
const recetaCol = collection(db, "recetas")
const storage = getStorage();

async function getImage(path) {
  return getDownloadURL(ref(storage, path));
}

async function getExpedientes(idDoc, setState) {
  if (!idDoc) return [];
  const q = query(
    expedienteCol,
    where("idDoc", "==", idDoc),
    orderBy("nombre")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let expedientes = [];
    querySnapshot.forEach((doc) => {
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
    setState(expedientes);
  });
  return unsubscribe;
}

async function setExpediente(expediente, id) {
  let docRef = id ? doc(expedienteCol, id) : doc(expedienteCol);
  await setDoc(docRef, expediente);
}

async function deleteExpediente(id) {
  let docRef = id ? doc(expedienteCol, id) : doc(expedienteCol);
  await deleteDoc(docRef);
}

async function updateExpediente(id, expediente) {
  let docRef = id ? doc(expedienteCol, id) : doc(expedienteCol);
  await updateDoc(docRef, expediente);
}

async function getCitas(idDoc, setState) {
  if (!idDoc) return [];
  const q = query(
    citaCol,
    where("idDoc", "==", idDoc),
    where("active", "==", true)
  );


  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let citas = [];
    querySnapshot.forEach((doc) => {
      citas.push({
        id: doc.id,
        details: doc.data().detalles,
        end: doc.data().endDate.toDate(),
        idDoc: doc.data().idDoc,
        paciente: doc.data().paciente,
        pacienteCorreo: doc.data().pacienteCorreo,
        start: doc.data().startDate.toDate(),
        title: doc.data().titulo,
      });
    });
    setState(citas);
  });
  return unsubscribe;
}

async function setCita(cita, id) {
  let docRef = id ? doc(citaCol, id) : doc(citaCol);
  await setDoc(docRef, cita, { merge: true });
}

async function updateCita(cita, id) {
  let docRef = id ? doc(citaCol, id) : doc(citaCol);
  await updateDoc(docRef, cita, { merge: true });
}

async function getReceta(idDoc, setState) {
  if (!idDoc) return [];
  const q = query(
    recetaCol,
    where("idDoc", "==", idDoc)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let receta = [];
    querySnapshot.forEach((doc) => {
      receta.push({
        id: doc.id,
        idDoc: doc.data().idDoc,
        idPa: doc.data().idPa,
        edad: doc.data().edad,
        genero: doc.data().genero,
        fechaPr: doc.data().fechaPr.toDate(),
        medicamentos: doc.data().medicamentos
      });
    });
    setState(receta);
  });
  return unsubscribe;
}

async function setReceta(receta, id) {
  let docRef = id ? doc(recetaCol, id) : doc(recetaCol);
  await setDoc(docRef, receta);
}

export { getExpedientes, setExpediente, getImage, getCitas, setCita, updateCita, getReceta, setReceta, deleteExpediente, updateExpediente };
export default db;
