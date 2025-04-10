import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../assets/context/AppContext';
import MainDashboard from '../view/MainDashboard';
import ModalInputSPP from '../modal/ModalRPP';
import MainAntrian from '../view/MainAntrian';
import MainProses from '../view/MainProses';
import MainSelesai from '../view/MainSelesai';

export default function Route() {
  const [modalVisible, setModalVisible] = useState(false);
  const [lastPageRoute, setLastPageRoute] = useState('dashboard'); // simpan halaman terakhir selain modal
  const { route, setRoute } = useContext(AppContext); // pastikan AppContext punya setRoute

  useEffect(() => {
    if (route === 'inputRPP') {
      setModalVisible(true);
    } else {
      setModalVisible(false);
      setLastPageRoute(route); // update halaman terakhir kalau bukan modal
    }
  }, [route]);

  const handleCancel = () => {
    setModalVisible(false);
    setRoute(lastPageRoute); // kembali ke halaman sebelumnya setelah modal ditutup
  };

  const renderPage = () => {
    switch (lastPageRoute) {
      case 'dashboard':
        return <MainDashboard />;
      case 'pembayaran_antrian':
        return <MainAntrian />;
      case 'pembayaran_progress':
        return <MainProses />;
      case 'pembayaran_selesai':
        return <MainSelesai />;
      default:
        return '<MainDashboard />';
    }
  };

  return (
    <>
      {renderPage()}
      {modalVisible && (
        <ModalInputSPP
          visible={modalVisible}
          onCancel={handleCancel}
        />
      )}
    </>
  );
}
