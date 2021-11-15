import React from 'react';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';
import { useHistory } from "react-router";

const NotFound = () => {
  const history = useHistory();
  return (
    <div style={{ height: "100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Result
        status="404"
        title="404"
        subTitle="Lo sentimos, la página que ha visitado no existe."
        extra={<Button type="primary" onClick={() => history.push("/")}>Regresar</Button>}
        />
    </div>
  );
}

export default NotFound;