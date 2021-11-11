import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./auth-context";
import { getExpedientes, getCitas,getReceta } from "../firebase/firebase";
import DataContext from "./data-context";

const DataProvider = (props) => {
  const [expedientes, setExpedientes] = useState([]);
  const [receta, setReceta] = useState([]);
  const [citas, setCitas] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    
    try{
      const suscriberExpediente = getExpedientes(currentUser.uid, setExpedientes);
      const suscriberCitas = getCitas(currentUser.uid, setCitas);
      const suscriberReceta = getReceta(currentUser.uid, setReceta);
      return {suscriberExpediente, suscriberCitas,suscriberReceta};
    }catch(e){
      console.log("error "+e)
    }
  }, [currentUser.uid]);

  const dataObject = {
    expedientes,
    citas,
    receta
  };

  return (
    <DataContext.Provider value={dataObject}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
