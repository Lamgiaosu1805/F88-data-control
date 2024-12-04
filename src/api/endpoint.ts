export const endpoint = {
	auth: {
		login: "account/signIn",
		register: "auth/register",
		refreshToken: "auth/refresh-tokens",
	},

	f88: {
		getAll: "f88/getNumberOfDataForDate",
		listDate: (date: string) => `f88/listDataForDate?date=${date}`,
	},

	customer: {
		detail: (id: string) => `customer/${id}`,
	},
	catalog: {
		create: "catalog",
		gets: (queryString: string) => `catalog${queryString}`,
		get: (catalogId: string): string => `catalog/${catalogId}`,
		update: (catalogId: string): string => `catalog/${catalogId}`,
		delete: (catalogId: string) => `catalog/${catalogId}`,
	},
	department: {
		list: "phongBan/getListPhongBan",
		create: "phongBan/createPhongBan",
	},
	staff: {
		list: "employee/getListEmployee",
		create: "employee/createEmployee",
	},
	position: {
		list: "phongBan/getListChucVu",
	},
};
