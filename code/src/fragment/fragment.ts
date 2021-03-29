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
	static getTag : (x:string) => string = Tag.fragmentTag;
	static getNewFragment : (x:string) => string = (x) => new View.FragmentView(x).toString();
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
	static getTag : (x:string) => string = Tag.fragmentArrayTag;
	static getNewFragment : (x:string) => string = (x) => new View.FragmentArrayView(x).toString();
	static Base: any = FragmentArray;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};

export class FragmentList extends Fragment {
	static save : Function = CreateFragment.initFragment;
	static getTag : (x:string) => string = Tag.fragmentListTag;
	static getNewFragment : (x:string) => string = (x) => new View.FragmentListView(x).toString();
	static Base : any = FragmentList;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};

export class FragmentLive extends Fragment {
	static save : Function = CreateFragment.initFragment;
	static getTag : (x:string) => string = Tag.fragmentLiveTag;
	static getNewFragment : (x:string) => string = (x) => new View.FragmentLiveView(x).toString();
	static Base : any = FragmentLive;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};

export class FragmentLiveArray extends Fragment {
	static save : Function = CreateFragment.initFragment;
	static getTag : (x:string) => string = Tag.fragmentLiveArrayTag;
	static getNewFragment : (x:string) => string = (x) => new View.FragmentLiveArrayView(x).toString();
	static Base : any = FragmentLiveArray;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};


export class FragmentLiveList extends Fragment {
	static save : Function = CreateFragment.initFragment;
	static getTag : (x:string) => string = Tag.fragmentLiveListTag;
	static getNewFragment : (x:string) => string = (x) => new View.FragmentLiveListView(x).toString();
	static Base : any = FragmentLiveList;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};

export class FragmentUnknown extends Fragment {
	static save : Function = (x:any) => null;
	static getTag : (x:string) => string = (x) => '';
	static getNewFragment : (x:string) => string = (x) => `FragmentUnknown<${x}>`;
	static Base : any = FragmentUnknown;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};