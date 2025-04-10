import React, { useContext } from 'react';
import {
  FileTextFilled,
  FileAddFilled,
  AppstoreFilled,
  FundFilled,
  EyeFilled,
  DollarOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
import logoMini from '../assets/img/PTPN-4.png';
import { AppContext } from '../assets/context/AppContext';

export default function SidebarDashboard({ collapsed }) {
  const { handleRouteChange, route } = useContext(AppContext);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}>
      <div
        style={{
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          transition: 'all 0.3s',
        }}>
        <img
          src={logoMini}
          alt="Logo Mini"
          style={{
            width: '40px',
            marginRight: collapsed ? '0' : '10px',
            transition: 'all 0.3s',
          }}
        />
        {!collapsed && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: '1',
            }}>
            <span
              style={{
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#1B732E',
              }}>
              OLIDOS R2
            </span>
            <span
              style={{
                fontSize: '6px',
                color: '#3CB043',
                marginTop: '2px',
                letterSpacing: '0.1px',
                fontWeight: 'bold',
              }}>
              ONLINE DOCUMENT SUPPORT SYSTEM
            </span>
          </div>
        )}
      </div>

      <Menu
        style={{
          backgroundColor: '#C9E9BF',
          color: '#000',
        }}
        mode="inline"
        selectedKeys={[route]}
        onClick={({ key }) => handleRouteChange(key)}
        items={[
          {
            key: 'inputRPP',
            icon: <FileAddFilled style={{ color: '#1B732E' }} />,
            label: 'Tambah Dokumen',
          },
          {
            key: 'dashboard',
            icon: <AppstoreFilled />,
            label: 'Dashboard',
          },
          // {
          //   key: 'monitoring',
          //   icon: <FundFilled />,
          //   label: 'Monitoring',
          //   children: [
          //     { key: 'monitoring_progress', label: 'Progress' },
          //     { key: 'monitoring_selesai', label: 'Selesai' },
          //   ],
          // },
          {
            key: 'pembayaran',
            icon: <DollarOutlined />,
            label: 'Pembayaran',
            children: [
              { key: 'pembayaran_antrian', label: 'Antrian' },
              { key: 'pembayaran_progress', label: 'Progress' },
              { key: 'pembayaran_selesai', label: 'Selesai' },
            ],
          },
          {
            key: 'tracking',
            icon: <EyeFilled />,
            label: 'Pelacak Dokumen',
          },
        ]}
      />
    </Sider>
  );
}
