import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useContext } from "react";
import AuthContext from "../context/auth-context";
// Create a root reference

const UploadPic = ({imgCallback}) => {
  const storage = getStorage();
  const AuthCtx = useContext(AuthContext);

  const atributos = {
    accept: ".jpg, .png",
    name: "file",
    listType: "picture",
    onChange(info) {
      if (info.file.status !== "uploading") {
        //console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    customRequest(options) {
      //console.log(options)
      const { onProgress, onError, onSuccess } = options;
      const imgRef = ref(
        storage,
        `${AuthCtx.currentUser.uid}/${options.file.uid}`
      );
      onProgress((event) => {
        console.log("Progreso " + event);
      });
      uploadBytes(imgRef, options.file)
        .then((snapshot) => {
          imgCallback(snapshot.ref.fullPath)
          onSuccess();
        })
        .catch((e) => {
          onError();
        }); 
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  return (
    <div style={{backgroundColor:"white"}}>
      <Upload {...atributos}>
        <Button icon={<UploadOutlined />}>Subir Archivos</Button>
      </Upload>
    </div>
  );
};

export default UploadPic;
