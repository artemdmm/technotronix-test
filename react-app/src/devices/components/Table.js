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
                    <th class="expand">Название</th>
                    <th>Версия</th>
                    <th>Состояние</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, idx) => {
                    return (
                    <tr key={idx}>
                        <td>{row.id}</td>
                        <td>{row.dev_name}</td>
                        <td>{row.version}</td>
                        <td>{row.condition ? <>Вкл.</> : <>Выкл.</>}</td>
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