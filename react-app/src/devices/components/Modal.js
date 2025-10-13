import React, { useState } from "react";

import "../../style/Modal.css";

export const Modal = ({ closeModal, onSubmit, defaultValue, onError }) => {
  const [formState, setFormState] = useState(
    defaultValue || {
      dev_name: "",
      version: "",
      condition: false,
    }
  );
  const [errors, setErrors] = useState(false);

  const validateForm = () => {
    if (!formState.dev_name || !formState.version) {
        setErrors(true);
        return false;
    }
    else {
      setErrors(false);
      return true;
    }
  };

  const handleChange = (e) => {
    {e.target.name === "condition"
      ? setFormState({ ...formState, [e.target.name]: e.target.checked })
      : setFormState({ ...formState, [e.target.name]: e.target.value })}
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
            <label htmlFor="dev_name">Название</label>
            <input name="dev_name" onChange={handleChange} value={formState.dev_name} />
          </div>
          <div className="form-group">
            <label htmlFor="version">Версия прошивки</label>
            <input name="version" onChange={handleChange} value={formState.version} />
          </div>
          <div className="form-group">
            <label htmlFor="condition">Состояние
            <input name="condition" type="checkbox" className="CheckBoxInput" onChange={handleChange} checked={formState.condition}/></label>
          </div>
          {errors && <div className="error">{`Введите все поля`}</div>}
          {onError && !errors && <div className="error">{`Название должно быть уникальным`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};