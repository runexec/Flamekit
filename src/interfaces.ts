export interface IPaths {
	calling_path: string;
	active_path: string | undefined;
}

export interface IWorkpingPaths extends IPaths {
	assets_path: string;
	css_path: string;
}