import React, { useState } from "react";

import "../../style/Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue, onError }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      acc_name: "",
      nom_voltage: "",
      capacity: "",
      exp_date: "",
    }
  );
  const [errors, setErrors] = useState(false);

  const validateForm = () => {
    if (!formState.acc_name || formState.nom_voltage === "" || formState.capacity === "" || !formState.exp_date) {
        setErrors(true);
        return false;
    }
    else {
      setErrors(false);
      return true;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formState);
    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="acc_name">Название</label>
            <input name="acc_name" onChange={handleChange} value={formState.acc_name} />
          </div>
          <div className="form-group">
            <label htmlFor="nom_voltage">Номинальное напряжение</label>
            <input name="nom_voltage" type="number" onChange={handleChange} value={formState.nom_voltage}/>
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Остаточная ёмкость</label>
            <input name="capacity" type="number" onChange={handleChange} value={formState.capacity}/>
          </div>
          <div className="form-group">
            <label htmlFor="exp_date">Срок службы</label>
            <input name="exp_date" type="date" onChange={handleChange} value={formState.exp_date} />
          </div>
          {errors && <div className="error">{`Введите все поля`}</div>}
          {onError && !errors && <div className="error">{`Название должно быть уникальным`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};