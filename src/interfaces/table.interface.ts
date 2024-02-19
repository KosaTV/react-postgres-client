export interface TableRow {
	[key: string]: any;
}

export interface DynamicTableProps {
	data: TableRow[];
	columns: number;
}
