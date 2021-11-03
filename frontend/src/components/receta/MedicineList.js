import React from 'react';
import { List } from 'antd';
import 'antd/dist/antd.css';

const MedicineList = React.forwardRef((props, ref) => {
    const data = [
        {
            title: 'Medicina 1',
            description: "Tomar 1 al dia, durante 4 dias."
        },
        {
            title: 'Medicina 2',
            description: "Tomar 2 al dia, durante 4 dias."
        },
        {
            title: 'Medicina 3',
            description: "Tomar 3 al dia, durante 4 dias."
        },
        {
            title: 'Medicina 4',
            description: "Tomar 4 al dia (como que es waro), todos los dias."
        },
    ];
    return (
        <div style={{ overflow: "hidden"}} ref={ref}>
            <List
                style={{ margin: 5 }}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
});

export default MedicineList;