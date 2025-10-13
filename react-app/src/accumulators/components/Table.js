import React from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

import "../../style/Table.css";

export const Table = ({ rows, deleteRow, editRow }) => {
    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th className="expand">Название</th>
                    <th>Напряжение</th>
                    <th>Ёмкость</th>
                    <th>Срок службы</th>
                    <th>ID устройства</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, idx) => {
                    return (
                    <tr key={idx}>
                        <td>{row.id}</td>
                        <td>{row.acc_name}</td>
                        <td>{row.nom_voltage}</td>
                        <td>{row.capacity}</td>
                        <td>{row.exp_date}</td>
                        <td>{row.device_id}</td>
                        <td className="fit">
                            <span className="actions">
                                <BsFillPencilFill
                                className="edit-btn"
                                onClick={() => editRow(idx)}
                                />
                                <BsFillTrashFill
                                className="delete-btn"
                                onClick={() => deleteRow(idx)}
                                />
                            </span>
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}