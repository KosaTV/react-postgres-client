import {useEffect, useState} from "react";
import {IEntepriseUsersResponse} from "../interfaces/users.interface";
import useEnterprise from "./useEnterprise";

const useFetchUsers = (taxId: number, page: number) => {
	const {getUsers} = useEnterprise();
	const [users, setUsers] = useState<IEntepriseUsersResponse>({
		data: [],
		total: 0
	});
	const [error, setError] = useState<{message: string}>();
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);
			try {
				const userData = await getUsers(taxId, page);
				setUsers(userData);
			} catch (error) {
				let message = "Unknown Error";
				if (error instanceof Error) message = error.message;
				setError({message});
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, [taxId, page]);

	return {isLoading, error, users};
};

export default useFetchUsers;
