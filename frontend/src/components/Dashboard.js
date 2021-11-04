import React from "react";
import { Layout, Menu, Avatar, Button } from "antd";
import {
  WalletFilled,
  FileOutlined,
  CalendarOutlined,
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
        {({ currentUser, logout }) =>
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
              mode="inline"
              defaultSelectedKeys={["1"]}
              inlineIndent={24}
              defaultOpenKeys={["sub1"]}
            >
              <Menu.Item
                key="0"
                icon={
                  <Avatar src={`https://avatars.dicebear.com/api/jdenticon/${currentUser.uid}.svg`} style={{ marginLeft: -8 }} />
                }
                style={{ pointerEvents: "none" }}
              >
                Dr. {currentUser.displayName}
              </Menu.Item>

              <Menu.Item key="1" icon={<CalendarOutlined />} onClick={() => this.props.cb(`${this.props.path}/`)}>
                Citas Médicas
              </Menu.Item>

              <Menu.Item key="2" icon={<FileOutlined />} onClick={() => this.props.cb(`${this.props.path}/cita`)}>
                Crear Receta
              </Menu.Item>            

              <SubMenu key="sub1" icon={<WalletFilled />} title="Expedientes">
                <Menu.Item key="3" onClick={() => this.props.cb(`${this.props.path}/expediente`)}>
                  Crear expediente
                </Menu.Item>
                <Menu.Item key="4" onClick={() => this.props.cb(`${this.props.path}/expedientes`)}>
                  Ver expedientes
                </Menu.Item>
              </SubMenu>
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
              Med Aid - Hecho con <HeartTwoTone twoToneColor="#eb2f96" style={{ display: "inline-block", verticalAlign: "initial", fontSize: "16px" }} /> por DJCOK <CopyrightOutlined style={{ display: "inline-block", verticalAlign: "1px" }} />
            </Footer>
          </Layout>
        </Layout>)
        }
      </AuthContext.Consumer>
    );
  }
}
export default Dashboard;
