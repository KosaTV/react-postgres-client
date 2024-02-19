import React, {ReactNode, useEffect, useState} from "react";
import {DynamicTableProps} from "../../interfaces/table.interface";

const DynamicTable: React.FC<DynamicTableProps> = ({data, columns}) => {
	const [tableHTML, setTableHTML] = useState<ReactNode | null>(null);

	useEffect(() => {
		const generateTable = () => {
			if (!data || data.length === 0) {
				setTableHTML(null);
				return;
			}

			const headers = Object.keys(data[0]).slice(0, columns);
			const headerCells = headers.map((header, index) => <th key={index}>{header}</th>);

			const headerRow = <tr>{headerCells}</tr>;

			const dataRows = data.map((row, rowIndex) => {
				const cells = headers.map((header, columnIndex) => <td key={`${rowIndex}-${columnIndex}`}>{row[header]}</td>);
				return <tr key={rowIndex}>{cells}</tr>;
			});

			const tableBody = <tbody>{dataRows}</tbody>;

			setTableHTML(
				<table>
					<thead>{headerRow}</thead>
					{tableBody}
				</table>
			);
		};

		generateTable();
	}, [data, columns]);

	return tableHTML;
};

export default DynamicTable;
