export interface User {
	id: number;
	name: string;
	email: string;
}

export interface IEntepriseUsersResponse {
	data: User[];
	total: number;
}
