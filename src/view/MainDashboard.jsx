import { useState, useEffect } from 'react';
import { Card, Row, Col, Progress, Flex } from 'antd';
import {
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  FileTextOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import CountUp from 'react-countup'; // Import react-countup
import '../assets/css/dashboard.css';

// Custom donut chart component dengan animasi smooth
const DonutChart = ({ percent, title, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  // Menggunakan useEffect untuk animasi smooth pada chart
  useEffect(() => {
    const duration = 1500; // Durasi animasi dalam ms
    const interval = 20; // Interval update dalam ms
    const steps = duration / interval;
    const increment = percent / steps;
    let currentValue = 0;

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= percent) {
        currentValue = percent;
        clearInterval(timer);
      }
      setAnimatedPercent(Math.round(currentValue));
    }, interval);

    return () => clearInterval(timer);
  }, [percent]);

  return (
    <div
      className="donut-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Progress
        type="circle"
        percent={animatedPercent}
        strokeColor={color}
        strokeWidth={10}
        width={180}
        format={(value) => (
          <span className="donut-value">
            <CountUp
              end={value}
              duration={1.5}
            />
            %
          </span>
        )}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <div className="donut-label">{title}</div>
    </div>
  );
};

// Status Card component dengan CountUp
const StatusCard = ({ title, subtitle, count, icon, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`status-card ${color}`}
      bordered={false}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="status-card-content">
        <div className="status-card-icon">{icon}</div>
        <div className="status-card-info">
          <h3>{title}</h3>
          <p>{subtitle}</p>
          <div className="status-card-count">
            <CountUp
              start={0}
              end={count}
              duration={2.5}
              separator=","
              decimals={0}
              delay={0}
              useEasing={true} // Efek easing untuk animasi lebih alami
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function MainDashboard() {
  // Animation effect for counters dengan timing yang lebih baik
  useEffect(() => {
    // Delay sebelum memulai animasi
    const initialDelay = 300;

    // Tunda semua animasi dengan sedikit delay untuk efek masuk
    setTimeout(() => {
      // Animasi chart dengan staggered effect yang lebih smooth
      setTimeout(
        () =>
          setChartValues((prev) => ({
            ...prev,
          })),
        200
      );
      setTimeout(
        () =>
          setChartValues((prev) => ({
            ...prev,
          })),
        600
      );
      setTimeout(
        () =>
          setChartValues((prev) => ({
            ...prev,
            selesai: finalChartValues.selesai,
          })),
        1000
      );
    }, initialDelay);

    return () => {
      // Tidak perlu cleanup timer karena menggunakan CountUp
    };
  }, []);

  return (
    <div
      className="dashboard-container"
      style={{ padding: '24px' }}>
      {/* Donut Charts Row */}
      <Row
        gutter={[24, 24]}
        className="charts-row">
        <Col
          xs={24}
          md={8}>
          <Card
            className="chart-card"
            bordered={false}>
            <DonutChart
              percent={90}
              title="Antrian"
              color="#f06292"
            />
          </Card>
        </Col>
        <Col
          xs={24}
          md={8}>
          <Card
            className="chart-card"
            bordered={false}>
            <DonutChart
              percent={100}
              title="Progres"
              color="#ff9800"
            />
          </Card>
        </Col>
        <Col
          xs={24}
          md={8}>
          <Card
            className="chart-card"
            bordered={false}>
            <DonutChart
              percent={70}
              title="Selesai"
              color="#4caf50"
            />
          </Card>
        </Col>
      </Row>

      {/* Status Cards Row */}
      <Row
        gutter={[24, 24]}
        className="status-row">
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={8}
          xl={4.8}>
          <StatusCard
            title="ANTRIAN"
            subtitle="Dokumen Yang Perlu Ditindak Lanjuti"
            count={100}
            icon={<ExclamationCircleOutlined />}
            color="pink-card"
          />
        </Col>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={8}
          xl={4.8}>
          <StatusCard
            title="IN PROGRESS"
            subtitle="Dokumen Yang Dalam Proses"
            count={30}
            icon={<SyncOutlined spin />}
            color="yellow-card"
          />
        </Col>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={8}
          xl={4.8}>
          <StatusCard
            title="SELESAI"
            subtitle="Dokumen Yang Sudah Selesai"
            count={50}
            icon={<CheckCircleOutlined />}
            color="green-card"
          />
        </Col>
      </Row>
    </div>
  );
}
