/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as Tag from './controller/tag';
import * as CreateFragment from './controller/create';
import * as View from '../view';

export class Fragment {
	line: string;
	fs_path: string;
	directory: string;
	document: undefined | vscode.TextDocument;
	static save : Function = CreateFragment.initFragment;
	static getTag : (file_name:string) => string = Tag.fragmentTag;
	static getNewFragment : (file_name:string) => string = (x) => new View.Fragment.View({file_name: x}).toString();
	static Base: any = Fragment;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		this.directory = directory;
		this.fs_path = fs_path;
		this.line = line;
		return this;
	}
}

export class FragmentArray extends Fragment {
	static save : Function = CreateFragment.initFragment;
	static getTag : (file_name:string) => string = Tag.fragmentArrayTag;
	static getNewFragment : (file_name:string) => string = (x) => new View.FragmentArray.View({file_name: x}).toString();
	static Base: any = FragmentArray;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};

export class FragmentList extends Fragment {
	static save : Function = CreateFragment.initFragment;
	static getTag : (file_name:string) => string = Tag.fragmentListTag;
	static getNewFragment : (file_name:string) => string = (x) => new View.FragmentList.View({file_name: x}).toString();
	static Base : any = FragmentList;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};

export class FragmentLive extends Fragment {
	static save : Function = CreateFragment.initFragment;
	static getTag : (file_name:string) => string = Tag.fragmentLiveTag;
	static getNewFragment : (file_name:string) => string = (x) => new View.FragmentLive.View({file_name: x}).toString();
	static Base : any = FragmentLive;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};

export class FragmentLiveArray extends Fragment {
	static save : Function = CreateFragment.initFragment;
	static getTag : (file_name:string) => string = Tag.fragmentLiveArrayTag;
	static getNewFragment : (file_name:string) => string = (x) => new View.FragmentLiveArray.View({file_names: x}).toString();
	static Base : any = FragmentLiveArray;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};


export class FragmentLiveList extends Fragment {
	static save : Function = CreateFragment.initFragment;
	static getTag : (file_name:string) => string = Tag.fragmentLiveListTag;
	static getNewFragment : (file_name:string) => string = (x) => new View.FragmentLiveList.View({file_name: x}).toString();
	static Base : any = FragmentLiveList;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};

export class FragmentUnknown extends Fragment {
	static save : Function = (x:any) => null;
	static getTag : (file_name:string) => string = (x) => '';
	static getNewFragment : (file_name:string) => string = (x) => `FragmentUnknown<${x}>`;
	static Base : any = FragmentUnknown;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};