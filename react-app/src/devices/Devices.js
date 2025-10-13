import { useState, useEffect } from "react";
import { Table } from './components/Table';
import { Modal } from './components/Modal';
import api from '../api'
import '../style/Devices.css';

export const Devices = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [rows, setRows] = useState([]);

  const fetchDevs = async () => {
    const response = await api.get('/devices/get');
    setRows(response.data)
  };

  const handleSubmit = async (newRow) => {
    rowToEdit === null
      ? await api.post('/devices/add', {
        dev_name: newRow.dev_name,
        version: newRow.version,
        condition: newRow.condition
      }).catch((error) => {
        setModalOpen(true);
        setFetchError(true);
      })
      : await api.put('/devices/update/'+newRow.id, {
        dev_name: newRow.dev_name,
        version: newRow.version,
        condition: newRow.condition
      }).catch((error) => {
        setModalOpen(true);
        setFetchError(true);
      });
    fetchDevs();
  };

  const handleDeleteRow = async (targetIndex) => {
    await api.delete('/devices/delete/'+rows[targetIndex].id);
    fetchDevs();
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  useEffect(() => {
    document.title = 'Устройства';
    fetchDevs();
  }, []);

  return (
    <div className="App">
      <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
      <div className="ButtonContainer"><button onClick={() => setModalOpen(true)} className="btn">Добавить</button></div>
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
            setRowToEdit(null);
            setFetchError(false);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
          onError={fetchError}
        />
      )}
    </div>
  );
}

export default Devices;
