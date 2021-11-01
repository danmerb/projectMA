import React from "react";
import { Layout, Menu, Avatar, Button } from "antd";
import {
  WalletFilled,
  FileOutlined,
  CalendarOutlined,
  MedicineBoxOutlined,
  HeartTwoTone,
  CopyrightOutlined
} from "@ant-design/icons";
import AuthContext from "../context/auth-context";
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
            width={200}
            collapsedWidth={75}
          >
            <div className="logo" />
            <Menu
              theme="dark"
              defaultSelectedKeys={["0"]}
              mode="inline"
              inlineIndent={24}
              defaultOpenKeys={["sub1", "sub2"]}
            >
              <Menu.Item key="0" icon={<MedicineBoxOutlined />} onClick={()=>this.props.cb(`${this.props.path}/`)}>
                MED AID HOME
              </Menu.Item>
              <Menu.Item
                key="1"
                icon={
                  <Avatar
                    src={`https://avatars.dicebear.com/api/jdenticon/${currentUser.uid}.svg`}
                  />
                }
              >
                Dr. {currentUser.displayName}
              </Menu.Item>
              <SubMenu key="sub1" icon={<WalletFilled />} title="Expedientes">
                <Menu.Item key="3" onClick={()=>this.props.cb(`${this.props.path}/expediente`)}>
                  Crear Expediente
                </Menu.Item>
                <Menu.Item key="4" disabled>
                  Expediente 2
                </Menu.Item>
                <Menu.Item key="5" danger>
                  Expediente 3
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<CalendarOutlined />} title="Citas Medicas">
                <Menu.Item key="6" onClick={()=>this.props.cb(`${this.props.path}/calendario`)}>Paciente 1</Menu.Item>
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
              {this.props.children}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Med Aid - Hecho con <HeartTwoTone twoToneColor="#eb2f96" style={{ display: "inline-block", verticalAlign: "initial" , fontSize: "16px"}} /> por DJCOK <CopyrightOutlined style={{ display: "inline-block", verticalAlign: "1px" }}/>
            </Footer>
          </Layout>
        </Layout>)
      }
      </AuthContext.Consumer>
    );
  }
}
export default Dashboard;
