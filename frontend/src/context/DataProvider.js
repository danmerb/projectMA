import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./auth-context";
import { getExpedientes, getCitas } from "../firebase/firebase";
import DataContext from "./data-context";

const DataProvider = (props) => {
  const [expedientes, setExpedientes] = useState([]);
  const [citas, setCitas] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    console.log("EFECTO DATA")
    try{
      const suscriberExpediente = getExpedientes(currentUser.uid, setExpedientes);
      const suscriberCitas = getCitas(currentUser.uid, setCitas);
      return {suscriberExpediente, suscriberCitas};
    }catch(e){
      console.log("error "+e)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.uid]);

  const dataObject = {
    expedientes,
    citas
  };

  return (
    <DataContext.Provider value={dataObject}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
