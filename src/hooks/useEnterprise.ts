import axios from "axios";
import {ITEMS_PER_PAGE} from "../utils/constants";

const useEnterprise = () => {
	const getUsers = async (taxId: number, page: number) => {
		try {
			const allUsers = await axios.get(`http://localhost:9000/enterprise/users?taxId=${taxId}`);
			const startIndex = (page - 1) * ITEMS_PER_PAGE;
			const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, allUsers.data.length);
			const usersForPage = allUsers.data.slice(startIndex, endIndex);
			return {data: usersForPage, total: allUsers.data.length};
		} catch (error) {
			console.error("Error fetching enterprise users:", error);
			throw error;
		}
	};

	return {getUsers};
};

export default useEnterprise;
