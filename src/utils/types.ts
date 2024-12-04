export interface resultsType {
	limit: number;
	page: number;
	results: Array<any>;
	totalPages: number;
	totalResults: number;
}

/// common type
interface AccessToken {
	token: string;
	expires: string;
}
interface RefreshToken {
	token: string;
	expires: string;
}
interface inforUser {
	active: boolean;
	address: string;
	avatar: string;
	devicedId: string;
	email: string;
	id: string;
	name: string;
	phoneNumber: string;
	role: string;
	favouriteList: Array<object>;
	isEmailVerified: boolean;
}

export interface refreshTokensResultType {
	access: AccessToken;
	refresh: RefreshToken;
}
/// type authentication
export interface dataPostCatalog {
	name?: string;
	active?: boolean;
	page?: number | 1;
	limit?: number | 10;
	sortBy?: string;
	id?: string;
	callback?: (result: any) => void;
}
export interface dataUpdateCatalog extends dataPostCatalog {
	id: string;
}

export interface datagetCatalogs extends dataPostCatalog {}
export interface paginationType {
	page: number | 1;
	limit: number | 10;
	sortBy?: string;
}

export interface catalogDetailType {
	active: boolean;
	id: string;
	name: string;
}
export interface catalogType {
	loading: boolean;
	catalogDetail: object | null;
	catalogs: Array<catalogDetailType>;

	limit: number | null;
	totalPages: number;
	totalResults: number;
}

export interface catalogResultType {
	limit: number;
	page: number;
	results: Array<catalogDetailType>;
	totalPages: number;
	totalResults: number;
}

export interface searchCatalogType {
	name: string;
	active: boolean;
	limit: number;
	page: number;
}

/// type catalog

interface addressForRestaurant {
	name: string;
	_id: string;
}
interface detailRestaurantType {
	address: Array<addressForRestaurant>;
	approval: boolean;
	avatar: string;
	block: boolean;
	dishes: Array<any>;
	email: string;
	feedback: Array<any>;
	hotline: string;
	id: string;
	isEmailVerified: boolean;
	name: string;
	order: Array<any>;
	rate: 5;
}
export interface restaurantSliceType {
	loading: boolean;
	catalogDetail: object | null;
	catalogs: Array<detailRestaurantType>;
	approval: Array<detailRestaurantType>;
	limit: number | null;
	totalPages: number;
	totalResults: number;
}

/// type restaurant

export interface DataForDate {
	// id: string;
	date: string;
	count: number;
}
