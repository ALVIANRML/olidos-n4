import { useState, useEffect } from 'react';
import {
  Table,
  Typography,
  Tag,
  Input,
  DatePicker,
  Select,
  Button,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  FileExcelOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import '../assets/css/antrian.css';
import axios from 'axios';
import config from '../../env'

const { Title } = Typography;
const { Option } = Select;

export default function MainAntrian() {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([])
  const [filterBidang, setFilterBidang] = useState(null);
  const [filterStatus, setFilterStatus] = useState(null);
  const [filterDate, setFilterDate] = useState(null);
  
  useEffect(() => {
    const aksesDataFunc = async () => {
      await axios.get(`${config.base_url}/kontrak?pemilik=${JSON.parse(localStorage.getItem('user_data')).id}&&lokasi=${JSON.parse(localStorage.getItem('user_data')).id}`)
        .then(res => {
          setData(res.data)
        }).catch(err => {
          console.log('error : ', err)
          alert('gagal')
        })
    }

    aksesDataFunc()
  }, [])

  // Sample data - in a real app, this would come from an API
  // const data = [
  //   {
  //     key: '1',
  //     no_kontrak: 'KTR-2023-001',
  //     bidang_pekerjaan: 'Konstruksi',
  //     nilai_kontrak: 'Rp 250.000.000',
  //     tanggal_selesai: '2023-12-15',
  //     rencana_hari: 10,
  //     pengerjaan_saat_ini: 8,
  //     status_dokumen: 'Antrian',
  //   },
  //   {
  //     key: '2',
  //     no_kontrak: 'KTR-2023-002',
  //     bidang_pekerjaan: 'Elektrikal',
  //     nilai_kontrak: 'Rp 175.000.000',
  //     tanggal_selesai: '2023-12-20',
  //     rencana_hari: 15,
  //     pengerjaan_saat_ini: 16,
  //     status_dokumen: 'Antrian',
  //   },
  //   {
  //     key: '3',
  //     no_kontrak: 'KTR-2023-003',
  //     bidang_pekerjaan: 'Mekanikal',
  //     nilai_kontrak: 'Rp 320.000.000',
  //     tanggal_selesai: '2023-12-30',
  //     rencana_hari: 20,
  //     pengerjaan_saat_ini: 20,
  //     status_dokumen: 'Antrian',
  //   },
  //   {
  //     key: '4',
  //     no_kontrak: 'KTR-2023-004',
  //     bidang_pekerjaan: 'IT',
  //     nilai_kontrak: 'Rp 150.000.000',
  //     tanggal_selesai: '2023-12-10',
  //     rencana_hari: 7,
  //     pengerjaan_saat_ini: 5,
  //     status_dokumen: 'Antrian',
  //   },
  //   {
  //     key: '5',
  //     no_kontrak: 'KTR-2023-005',
  //     bidang_pekerjaan: 'Konstruksi',
  //     nilai_kontrak: 'Rp 450.000.000',
  //     tanggal_selesai: '2024-01-15',
  //     rencana_hari: 30,
  //     pengerjaan_saat_ini: 32,
  //     status_dokumen: 'Antrian',
  //   },
  // ];

  // Filter data based on search text, filters, and date
  // const filteredData = data.filter((item) => {
  //   const matchesSearch = Object.values(item).some(
  //     (value) =>
  //       typeof value === 'string' &&
  //       value.toLowerCase().includes(searchText.toLowerCase())
  //   );

  //   const matchesBidang =
  //     !filterBidang || item.bidang_pekerjaan === filterBidang;
  //   const matchesStatus = !filterStatus || item.status_dokumen === filterStatus;

  //   // Date filter using YYYY-MM-DD format
  //   const matchesDate =
  //     !filterDate || item.tanggal_selesai === filterDate.format('YYYY-MM-DD');

  //   return matchesSearch && matchesBidang && matchesStatus && matchesDate;
  // });

  const columns = [
    {
      title: 'No. Kontrak',
      dataIndex: 'no_kontrak',
      key: 'no_kontrak',
      sorter: (a, b) => a.no_kontrak.localeCompare(b.no_kontrak),
      responsive: ['md'],
    },
    {
      title: 'Objek Pekerjaan',
      dataIndex: 'objek_pekerjaan',
      key: 'bidang_pekerjaan',
      sorter: (a, b) => a.bidang_pekerjaan.localeCompare(b.bidang_pekerjaan),
    },
    {
      title: 'Nilai Kontrak',
      dataIndex: 'nilai',
      key: 'nilai_kontrak',
      sorter: (a, b) => {
        const valueA = Number.parseInt(a.nilai_kontrak.replace(/\D/g, ''));
        const valueB = Number.parseInt(b.nilai_kontrak.replace(/\D/g, ''));
        return valueA - valueB;
      },
      responsive: ['lg'],
    },
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      key: 'tanggal_selesai',
      sorter: (a, b) =>
        new Date(a.tanggal_selesai) - new Date(b.tanggal_selesai),
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
      },
      responsive: ['lg'],
    },
    // {
    //   title: 'Lama Proses',
    //   key: 'lama_proses',
    //   render: (_, record) => {
    //     const { rencana_hari, pengerjaan_saat_ini } = record;
    //     const isLate = pengerjaan_saat_ini > rencana_hari;

    //     // Calculate percentages for progress bar
    //     // If on time or exactly on schedule
    //     if (!isLate) {
    //       const onTimePercent = (pengerjaan_saat_ini / rencana_hari) * 70; // Only use 70% of the bar when on time

    //       return (
    //         <div className="lama-proses-wrapper">
    //           <div className="custom-progress">
    //             <div
    //               className="progress-bar on-time"
    //               style={{ width: `${onTimePercent}%` }}>
    //               <span className="progress-text-inside">
    //                 {pengerjaan_saat_ini}h/{rencana_hari}h
    //               </span>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     } else {
    //       // If late, show both on-time and late portions
    //       // Calculate percentages while ensuring there's space at the end
    //       const totalWidth = 85; // Total width of both bars combined (out of 100%)
    //       const ratio = rencana_hari / pengerjaan_saat_ini;
    //       const lateRatio =
    //         (pengerjaan_saat_ini - rencana_hari) / pengerjaan_saat_ini;

    //       // Distribute the 85% total width proportionally
    //       const onTimePercent = ratio * totalWidth;
    //       const latePercent = lateRatio * totalWidth;

    //       return (
    //         <div className="lama-proses-wrapper">
    //           <div className="custom-progress">
    //             <div
    //               className="progress-bar on-time"
    //               style={{ width: `${onTimePercent}%` }}>
    //               <span className="progress-text-inside">{rencana_hari}h</span>
    //             </div>
    //             <div
    //               className="progress-bar late"
    //               style={{ width: `${latePercent}%` }}>
    //               <span className="progress-text-inside">
    //                 +{pengerjaan_saat_ini - rencana_hari}h
    //               </span>
    //             </div>
    //           </div>
    //           <Tag
    //             color="red"
    //             className="late-tag">
    //             {pengerjaan_saat_ini - rencana_hari} hari terlambat
    //           </Tag>
    //         </div>
    //       );
    //     }
    //   },
    // },
    // {
    //   title: 'Status',
    //   key: 'status_pengerjaan',
    //   render: (_, record) => {
    //     const isLate = record.pengerjaan_saat_ini > record.rencana_hari;
    //     return (
    //       <Tag
    //         color={isLate ? 'red' : 'green'}
    //         className="status-tag">
    //         {isLate ? 'Terlambat' : 'On Time'}
    //       </Tag>
    //     );
    //   },
    //   sorter: (a, b) => {
    //     const statusA =
    //       a.pengerjaan_saat_ini > a.rencana_hari ? 'Terlambat' : 'On Time';
    //     const statusB =
    //       b.pengerjaan_saat_ini > b.rencana_hari ? 'Terlambat' : 'On Time';
    //     return statusA.localeCompare(statusB);
    //   },
    // },
    // {
    //   title: 'Dokumen',
    //   dataIndex: 'status_dokumen',
    //   key: 'status_dokumen',
    //   render: (status) => {
    //     let color = 'blue';
    //     if (status === 'Antrian') color = 'red';
    //     else if (status === 'On Progress') color = 'gold';
    //     else if (status === 'Selesai') color = 'green';

    //     return (
    //       <Tag
    //         color={color}
    //         className="status-dokumen-tag">
    //         {status}
    //       </Tag>
    //     );
    //   },
    //   sorter: (a, b) => a.status_dokumen.localeCompare(b.status_dokumen),
    // },
  ];

  // Get unique bidang pekerjaan for filter
  const bidangOptions = [...new Set(data.map((item) => item.bidang_pekerjaan))];
  const statusOptions = ['Antrian', 'On Progress', 'Selesai'];

  const handleDateChange = (date) => {
    setFilterDate(date);
  };

  return (
    <div>
      <div className="header">
        <Title
          level={2}
          className="title">
          SPP Antrian
        </Title>
        {/* <div className="action-buttons">
          <Button
            type="primary"
            icon={<FileExcelOutlined />}>
            <span className="button-text">Export</span>
          </Button>
          <Button icon={<PrinterOutlined />}>
            <span className="button-text">Print</span>
          </Button>
          <Button icon={<ReloadOutlined />}>
            <span className="button-text">Refresh</span>
          </Button>
        </div> */}
      </div>

      <div className="filters">
        <div className="filter-row">
          <Input
            placeholder="Cari..."
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-row">
          <Select
            placeholder="Filter Bidang"
            allowClear
            className="filter-select"
            onChange={(value) => setFilterBidang(value)}>
            {bidangOptions.map((bidang) => (
              <Option
                key={bidang}
                value={bidang}>
                {bidang}
              </Option>
            ))}
          </Select>

          <Select
            placeholder="Filter Status"
            allowClear
            className="filter-select"
            onChange={(value) => setFilterStatus(value)}>
            {statusOptions.map((status) => (
              <Option
                key={status}
                value={status}>
                {status}
              </Option>
            ))}
          </Select>

          <DatePicker
            placeholder="Filter Tanggal"
            className="date-picker"
            onChange={handleDateChange}
            format="YYYY-MM-DD"
          />
        </div>
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: 10,
            responsive: true,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} dari ${total} item`,
          }}
          className="antrian-table"
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
}
