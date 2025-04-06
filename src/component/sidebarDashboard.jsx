import {
  FileTextFilled,
  FileAddFilled,
  AppstoreFilled,
  FundFilled,
  EyeFilled,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import logoMini from "../assets/img/PTPN-4.png";
import logo from "../assets/img/logo.svg";

export default function SidebarDashboard({ collapsed }) {
    return (
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ padding: "16px", textAlign: "center" }}>
          <img
            src={collapsed ? logoMini : logo}
            alt="Logo"
            style={{
              width: collapsed ? "40px" : "180px",
              transition: "all 0.5s",
            }}
          />
        </div>
        <Menu
          style={{
            backgroundColor: "#C9E9BF",
            color: "#000",
          }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <AppstoreFilled />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <FileAddFilled style={{ color: "#1B732E" }} />,
              label: "Tambah Dokumen",
            },
            {
              key: "3",
              icon: <FileTextFilled />,
              label: "Dokumen",
              children: [
                { key: "3-1", label: "Dokumen Antrian" },
                { key: "3-2", label: "Dokumen Progress" },
                { key: "3-3", label: "Dokumen Selesai" },
              ],
            },
            {
              key: "4",
              icon: <FundFilled />,
              label: "Monitoring",
            },
            {
              key: "5",
              icon: <EyeFilled />,
              label: "Pelacak Dokumen",
            },
          ]}
        />
      </Sider>
    );
  }
  