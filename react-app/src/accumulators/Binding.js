import { useState, useEffect } from "react";
import api from '../api'
import '../style/Bind.css';

export const Binding = () => {
  const [formState, setFormState] = useState({
    acc_id: 0,
    dev_id: 0
  });
  const [rowsAcc, setRowsAcc] = useState([]);
  const [rowsDev, setRowsDev] = useState([]);
  const [success, setSuccess] = useState(0);

  const fetchAccs = async () => {
    const response = await api.get('/accumulators/get');
    setRowsAcc(response.data)
  };

  const fetchDevs = async () => {
    const response = await api.get('/devices/get');
    setRowsDev(response.data)
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    var error403 = false;
    if (formState.acc_id == 0) {
      setSuccess(4);
      return false;
    }
    const response = await api.put('/accumulators/bind', {
      acc_id: formState.acc_id,
      dev_id: formState.dev_id,
    }).catch((error) => {
      setSuccess(3);
      error403 = true;
      return false;
    });
    if (!error403) {
      if (response.status == 200 && formState.dev_id == 0) {
        setSuccess(2);
      }
      else {
        setSuccess(1);
      }
    }
  };

  useEffect(() => {
    document.title = 'Привязка';
    fetchAccs();
    fetchDevs();
  }, []);

  return (
    <div className="App">
      <div className="bind-form">
        <div className="form-group">
          <label htmlFor="acc_id">Выберите акумулятор:</label>
          <select name="acc_id" onChange={handleChange}>
            <option value="0">-</option>
            {rowsAcc.map((row, idx) => {
              return (
                <option value={row.id}>{row.acc_name}</option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dev_id">Выберите устройство:</label>
          <select name="dev_id" onChange={handleChange}>
            <option value="0">-</option>
            {rowsDev.map((row, idx) => {
              return (
                <option value={row.id}>{row.dev_name}</option>
              );
            })}
          </select>
        </div>
      {success==4 && <div className="error">{`Выберите аккумулятор`}</div>}
      {success==3 && <div className="error">{`К устройству подключено 5 аккумуляторов, выберите другое устройство`}</div>}
      {success==2 && <div className="success">{`Устройство успешно отключено`}</div>}
      {success==1 && <div className="success">{`Устройство успешно подключено`}</div>}
      <div className="ButtonContainer"><button onClick={handleSubmit} className="btn">Привязать</button></div>
      </div>
    </div>
  );
}

export default Binding;
