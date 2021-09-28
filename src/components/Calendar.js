import { Calendar } from 'antd';

function onPanelChange(value) {
  console.log("Seleccionado: "+value.format('YYYY-MM-DD'));
}

const calendario =()=>{
    return (
        <Calendar onSelect={onPanelChange} />
    )
}

export default calendario;