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
	save : Function = CreateFragment.initFragment;
	getTag : (x:string) => string = Tag.fragmentTag;
	getNewFragment : (x:string) => string = (x) => new View.FragmentView(x).toString();
	Base: any;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		this.directory = directory;
		this.fs_path = fs_path;
		this.line = line;
		this.Base = Fragment;
		return this;
	}
}

export class FragmentArray extends Fragment {
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		this.getTag = Tag.fragmentArrayTag;
		this.getNewFragment = (x:string) => new View.FragmentArrayView(x).toString();
		this.Base = FragmentArray;
		return this;
	};
};

export class FragmentList extends Fragment {
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		this.getTag = Tag.fragmentListTag;
		this.getNewFragment = (x:string) => new View.FragmentListView(x).toString();
		this.Base = FragmentList;
		return this;
	};
};

export class FragmentLive extends Fragment {
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		this.getTag = Tag.fragmentLiveTag;
		this.getNewFragment = (x:string) => new View.FragmentLiveView(x).toString();
		this.Base = FragmentLive;
		return this;
	};
};

export class FragmentLiveArray extends Fragment {
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		this.getTag = Tag.fragmentLiveArrayTag;
		this.getNewFragment = (x:string) => new View.FragmentLiveArrayView(x).toString();
		this.Base = FragmentLiveArray;
		return this;
	};
};


export class FragmentLiveList extends Fragment {
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		this.getTag = Tag.fragmentLiveListTag;
		this.getNewFragment = (x:string) => new View.FragmentLiveListView(x).toString();
		this.Base = FragmentLiveList;
		return this;
	};
};

export class FragmentUnknown extends Fragment {
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		this.getTag = (x: string) => '';
		this.getNewFragment = (x: string) => '';
		this.Base = FragmentUnknown;
		return this;
	};
};