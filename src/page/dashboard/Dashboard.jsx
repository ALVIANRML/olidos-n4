import React, { useState } from 'react';
import '../../assets/css/dashboard.css';
import SidebarDashboard from '../../component/sidebarDashboard';
import { UserOutlined, CrownOutlined } from '@ant-design/icons';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import Route from '../../routes/Route';
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
          className="header-container"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0px 16px',
          }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="toggle-sidebar-btn"
          />

          <div
            className="user-badge-wrapper"
            style={{ display: 'flex', gap: '10px' }}>
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
              <span className="username">Admin</span>
            </Button>
          </div>
        </div>

        <Content
          className="content-layout scrollable-content"
          style={{
            margin: '0px 10px',
            padding: 30,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: 'auto',
            height: 'calc(100vh - 64px)', // Adjust this value based on your header height
          }}>
          <div className="route-container">
            <Route />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
