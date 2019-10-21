export interface IJwt {
	header: IJwtHeader;
	payload: string;
	signature: string;
}

export interface IJwtHeader {
	alg: string;
	typ: string;
}

export interface IJwtPayload {
	id: string;
	name: string;
}
