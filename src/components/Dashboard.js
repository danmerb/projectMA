import React from "react";
import { Layout, Menu, Avatar, Button } from "antd";
import {
  WalletFilled,
  FileOutlined,
  CalendarOutlined,
  MedicineBoxOutlined
} from "@ant-design/icons";
import AuthContext from "../context/auth-context";
import Calendar from "./Calendar"
import "../app.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Dashboard extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <AuthContext.Consumer >
        {({currentUser, logout})=>
        (<Layout style={{ minHeight: "100vh", maxWidth: "99%" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
            width={400}
            collapsedWidth={200}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              defaultSelectedKeys={["0"]}
              mode="inline"
              inlineIndent={24}
              defaultOpenKeys={["sub1", "sub2"]}
            >
              <Menu.Item key="0" icon={<MedicineBoxOutlined />}>
                MED AID
              </Menu.Item>
              <Menu.Item
                key="1"
                icon={
                  <Avatar
                    src={`https://avatars.dicebear.com/api/jdenticon/${currentUser.uid}.svg`}
                  />
                }
              >
                Bienvenido Dr. {currentUser.displayName}
              </Menu.Item>
              <SubMenu key="sub1" icon={<WalletFilled />} title="Expedientes">
                <Menu.Item key="3" danger>
                  Expediente 1
                </Menu.Item>
                <Menu.Item key="4" disabled>
                  Expediente 2
                </Menu.Item>
                <Menu.Item key="5">
                  Expediente 3
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<CalendarOutlined />} title="Citas Medicas">
                <Menu.Item key="6">Paciente 1</Menu.Item>
                <Menu.Item key="8">Paciente 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />}>
                Crear Receta
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background">
              <Button type="primary" onClick={logout}>Cerrar Sesion</Button>
            </Header>
            <Content className="content-layout">
              <Calendar />
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Med Aid - DJCOK
            </Footer>
          </Layout>
        </Layout>)
      }
      </AuthContext.Consumer>
    );
  }
}
export default Dashboard;