import React, { useState, useSyncExternalStore } from "react";
import "./googleSheet.css";
const rows = [1]; // 2, 3, 4, 5, 6, 7, 8, 9, 10

const cols = ["A", "B", "C", "D", "E"];

function generateCellId(r: number, c: string) {
    return `${r}${c}`;
}

function createSheet(rows: number[], cols: string[]) {
    const sheet: Record<string, any> = {};
    {
        rows.forEach((r) => {
            cols.forEach((c) => {
                const id = generateCellId(r, c);
                sheet[id] = {
                    value: "",
                    formula: "",
                };
            });
        });
    }
    return sheet;
}

function evaluateCellValue(cellId, newValue, updatedSheet) {}

const GoogleSheet = () => {
    const [sheet, setSheet] = useState(() => createSheet(rows, cols));

    function updateCell(cellId: string, e) {
        const updatedSheet = { ...sheet };
        const value = e.target.value;

        console.log(value, cellId);
        if (typeof value == "string" && value.startsWith("=")) {
            const newValue = value.substring(1).split(/[\+\-\*\/]/);
            updatedSheet[cellId].dependency = newValue;
            // console.log(newValue);
            updatedSheet[cellId].formula = value;
            updatedSheet[cellId].value = "";
            const updatedEval = evaluateCellValue(
                cellId,
                newValue,
                updatedSheet,
            );
        } else {
            updatedSheet[cellId].value = value;
            updatedSheet[cellId].formula = "";
        }

        setSheet(updatedSheet);
    }

    return (
        <div className="google_sheet_container">
            <h1>GoogleSheet</h1>
            <table className="table_container">
                <thead>
                    <tr>
                        <th></th>
                        {cols.map((c) => (
                            <th key={c} style={{}}>
                                {c}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r) => {
                        return (
                            <tr className="row" key={r}>
                                <td>{r}</td>
                                {cols.map((c) => {
                                    const id = generateCellId(r, c);
                                    const cell = sheet[id];
                                    // console.log(cell);
                                    return (
                                        <td key={id} className="column">
                                            <input
                                                value={
                                                    cell.value || cell.formula
                                                }
                                                onChange={(e) =>
                                                    updateCell(id, e)
                                                }
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default GoogleSheet;
