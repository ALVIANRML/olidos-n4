import { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Button,
  Upload,
  Typography,
  message,
} from 'antd';
import {
  SaveOutlined,
  InboxOutlined,
  FileTextOutlined,
  UploadOutlined,
  FolderOutlined,
} from '@ant-design/icons';
import '../assets/css/modal.css';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;
const { Dragger } = Upload;

export default function ModalInputSPP({ visible, onCancel }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleSubmit = (values) => {
    console.log('Form values:', values);
    console.log('Uploaded files:', fileList);
    // Handle form submission logic here
  };

  const handleArchive = () => {
    form.validateFields().then((values) => {
      console.log('Archived values:', values);
      console.log('Archived files:', fileList);
      // Handle archive logic here
    });
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    fileList,
    beforeUpload: (file) => {
      if (file.type !== 'application/pdf') {
        message.error(`${file.name} bukan file PDF`);
        return Upload.LIST_IGNORE;
      }
      setFileList([...fileList, file]);
      return false;
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
  };

  // Custom title component that includes the buttons
  const modalTitle = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
      }}>
      <div className="modal-header">
        <FileTextOutlined className="modal-icon" />
        <span>Input SPP</span>
      </div>
      <div className="header-buttons">
        <Button
          type="primary"
          onClick={() => form.submit()}
          icon={<SaveOutlined />}
          size="middle"
          className="save-button">
          Simpan
        </Button>
        <Button
          type="default"
          onClick={handleArchive}
          icon={<FolderOutlined />}
          size="middle"
          className="archive-button">
          Arsip
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      width={800}
      centered
      footer={null}
      bodyStyle={{ padding: '14px', height: 'auto' }}
      className="spp-modal"
      title={modalTitle}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="compact-form">
        <div className="form-container">
          <div className="form-section">
            <Form.Item
              label="No Kontrak/SPMK/SP3"
              name="no_kontrak"
              rules={[{ required: true, message: 'Harap isi No Kontrak!' }]}>
              <Input placeholder="Masukkan No Kontrak" />
            </Form.Item>

            <Form.Item
              label="Tanggal Kontrak"
              name="tanggal_kontrak"
              rules={[
                { required: true, message: 'Harap pilih Tanggal Kontrak!' },
              ]}>
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="Uraian Kontrak"
              name="uraian_kontrak"
              rules={[
                { required: true, message: 'Harap isi Uraian Kontrak!' },
              ]}>
              <TextArea
                rows={2}
                placeholder="Masukkan Uraian Kontrak"
              />
            </Form.Item>

            <Form.Item
              label="Nilai Kontrak (Incl PPN)"
              name="nilai_kontrak"
              rules={[{ required: true, message: 'Harap isi Nilai Kontrak!' }]}>
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                }
                parser={(value) => value.replace(/\./g, '')}
                placeholder="Masukkan Nilai Kontrak"
                inputMode="numeric"
              />
            </Form.Item>

            <Form.Item
              label="Tanggal Mulai"
              name="tanggal_mulai"
              rules={[
                { required: true, message: 'Harap pilih Tanggal Mulai!' },
              ]}>
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="Tanggal Selesai"
              name="tanggal_selesai"
              rules={[
                { required: true, message: 'Harap pilih Tanggal Selesai!' },
              ]}>
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className="form-section">
            <Form.Item
              label="Pemborong"
              name="pemborong"
              rules={[{ required: true, message: 'Harap isi Pemborong!' }]}>
              <Input placeholder="Masukkan Pemborong" />
            </Form.Item>

            <Form.Item
              label="Bidang Pekerjaan"
              name="bidang_pekerjaan"
              rules={[
                { required: true, message: 'Harap isi Bidang Pekerjaan!' },
              ]}>
              <Input placeholder="Masukkan Bidang Pekerjaan" />
            </Form.Item>

            <Form.Item
              label="Durasi Pekerjaan (Minggu)"
              name="durasi_pekerjaan"
              className="durasi-container"
              rules={[
                { required: true, message: 'Harap isi Durasi Pekerjaan!' },
              ]}>
              <InputNumber
                min={1}
                style={{ width: '100%' }}
                placeholder="Masukkan durasi"
                inputMode="numeric"
              />
            </Form.Item>

            <Form.Item
              label="No AU 31"
              name="no_au_31"
              rules={[{ required: true, message: 'Harap isi No AU 31!' }]}>
              <Input placeholder="Masukkan No AU 31" />
            </Form.Item>

            <Form.Item
              label="Kriteria"
              name="kriteria"
              rules={[{ required: true, message: 'Harap pilih Kriteria!' }]}>
              <Select placeholder="Pilih Kriteria">
                <Option value="Eksploitasi">Eksploitasi</Option>
                <Option value="Investasi">Investasi</Option>
                <Option value="Operasional">Operasional</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Asal Kontrak"
              name="asal_kontrak"
              rules={[
                { required: true, message: 'Harap pilih Asal Kontrak!' },
              ]}>
              <Select placeholder="Pilih Asal Kontrak">
                <Option value="Kebun/PKS">Kebun/PKS</Option>
                <Option value="Kantor Pusat">Kantor Pusat</Option>
                <Option value="Lainnya">Lainnya</Option>
              </Select>
            </Form.Item>
          </div>
        </div>

        <div className="upload-section">
          <Title
            level={5}
            style={{ marginTop: '8px', marginBottom: '6px' }}>
            <UploadOutlined /> Upload Lampiran
          </Title>
          <Dragger
            {...uploadProps}
            accept=".pdf"
            style={{ maxHeight: '110px' }}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Klik atau seret file PDF ke area ini untuk upload
            </p>
            <p className="ant-upload-hint">
              Mendukung upload multiple file. Hanya file PDF yang diperbolehkan.
            </p>
          </Dragger>
        </div>
      </Form>
    </Modal>
  );
}
