import React, { useState } from "react";
import "../../assets/css/dashboard.css";
import SidebarDashboard from "../../component/sidebarDashboard";
import { UserOutlined, CrownOutlined } from "@ant-design/icons";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
const { Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="dashboard-layout">
      <SidebarDashboard collapsed={collapsed} />
      <Layout>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <div
            className="user-badge-wrapper"
            style={{ display: "flex", gap: "10px" }}
          >
            <Button className="user-badge">
              <div className="icon-container">
                <CrownOutlined />
              </div>
              <span className="username">Chief Executive Officer</span>
            </Button>

            <Button className="user-badge">
              <div className="icon-container">
                <UserOutlined />
              </div>
              <span className="username">Alvian</span>
            </Button>
          </div>
        </div>

        <Content
          className="content-layout"
          style={{
            margin: "24px 16px",
            padding: 50,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <h1 className="h1-username">
            HI, <span className="username-name">ALVIAN</span>
          </h1>

          <div className="text-desc-olidos">
            <p>Selamat datang di aplikasi OLIDOS. Aplikasi ini merupakan pengembangan dari aplikasi Doctrace V.2 sebelumnya.Saat ini aplikasi OLIDOS terdiri dari 3 modul untuk di monitoring pergerakan dokumen dan progress pekerjaan yang mengacu pada Peraturan Direksi (perdir) dan realisasi yang dituang dalam bentuk S.I.A</p>
          </div>

          
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
