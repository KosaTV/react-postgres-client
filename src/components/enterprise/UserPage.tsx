import React, {useState} from "react";
import Pagination from "@mui/material/Pagination";
import DynamicTable from "../../components/builders/DynamicTable";
import {columns, ITEMS_PER_PAGE} from "../../utils/constants";
import useFetchUsers from "../../hooks/useFetchUsers";

type UserPageProps = {
	taxId: number;
};

export default function UserPage({taxId}: UserPageProps) {
	const [page, setPage] = useState(1);
	const {users, error, isLoading} = useFetchUsers(taxId, page);

	const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	return (
		<div style={{height: "100vh", display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center", alignItems: "center"}}>
			{isLoading ? (
				<span>Loading...</span>
			) : error ? (
				<span>Error: {error.message}</span>
			) : users.total !== 0 ? (
				<>
					<DynamicTable data={users.data} columns={columns} />
					<Pagination count={Math.ceil(users.total / ITEMS_PER_PAGE)} page={page} onChange={handlePageChange} />
				</>
			) : (
				<span>No results</span>
			)}
		</div>
	);
}
