import { useState, useEffect } from "react";
import { Table } from './components/Table';
import { Modal } from './components/Modal';
import api from '../api'
import '../style/Accumulators.css';

export const Accumulators = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [rows, setRows] = useState([]);

  const fetchAccs = async () => {
    const response = await api.get('/accumulators/get');
    setRows(response.data)
  };

  const handleSubmit = async (newRow) => {
    rowToEdit === null
      ? await api.post('/accumulators/add', {
        acc_name: newRow.acc_name,
        nom_voltage: newRow.nom_voltage,
        capacity: newRow.capacity,
        exp_date: newRow.exp_date
      }).catch((error) => {
        setModalOpen(true);
        setFetchError(true);
      })
      : await api.put('/accumulators/update/'+newRow.id, {
        acc_name: newRow.acc_name,
        nom_voltage: newRow.nom_voltage,
        capacity: newRow.capacity,
        exp_date: newRow.exp_date
      }).catch((error) => {
        setModalOpen(true);
        setFetchError(true);
      });
    fetchAccs();
  };

  const handleDeleteRow = async (targetIndex) => {
    await api.delete('/accumulators/delete/'+rows[targetIndex].id);
    fetchAccs();
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true);
  };

  useEffect(() => {
    document.title = 'Аккумуляторы';
    fetchAccs();
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

export default Accumulators;
