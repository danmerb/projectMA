import React from "react";
import { Layout, Menu, Avatar, Button, PageHeader } from "antd";
import {
  WalletFilled,
  FileOutlined,
  CalendarOutlined,
  HeartTwoTone,
  CopyrightOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import AuthContext from "../context/auth-context";
import "../app.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Dashboard extends React.Component {
  state = {
    collapsed: true,
    headerTitle: "Citas médicas",
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed, headerTitle } = this.state;
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

              <Menu.Item key="1" icon={<CalendarOutlined />}
                onClick={() => {
                  this.props.cb(`${this.props.path}/`);
                  this.setState({ headerTitle: "Citas médicas" });                  
                }}>
                Citas Médicas
              </Menu.Item>

              <Menu.Item key="2" icon={<FileOutlined />}
                onClick={() => {
                  this.props.cb(`${this.props.path}/receta`);
                  this.setState({ headerTitle: "Nueva receta" });
                }}>
                Crear Receta
              </Menu.Item>            

              <SubMenu key="sub1" icon={<WalletFilled />} title="Expedientes">
                <Menu.Item key="3"
                  onClick={() => {
                    this.props.cb(`${this.props.path}/expediente`);                    
                    this.setState({ headerTitle: "Nuevo expediente" });
                  }}>
                  Crear expediente
                </Menu.Item>
                <Menu.Item key="4"
                  onClick={() => {
                    this.props.cb(`${this.props.path}/expedientes`);                    
                    this.setState({ headerTitle: "Expedientes" });
                  }}>
                  Ver expedientes
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="5" icon={<LogoutOutlined style={{ color: '#c11c1e'}}/>} onClick={logout}>
                Cerrar Sesión
              </Menu.Item>
            </Menu>
          </Sider>

          <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}>
              <PageHeader                
                onBack={null}
                title={headerTitle}
                extra={<Button type="danger" onClick={logout}>Cerrar Sesión</Button>}
                style={{padding:8, paddingLeft:16}}
              />              
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
