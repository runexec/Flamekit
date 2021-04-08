/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as View from '../view';

import 'reflect-metadata';
import { container, singleton } from 'tsyringe';

const CreateFragment: { initFragment: Function } = container.resolve('fragment.CreateFragment');

type TagHandler = { getTag: (file_name: string) => string }

const FragmentTag: TagHandler = container.resolve('fragment.FragmentTag');
const FragmentArrayTag: TagHandler = container.resolve('fragment.FragmentArrayTag');
const FragmentListTag: TagHandler = container.resolve('fragment.FragmentListTag');
const FragmentLiveTag: TagHandler = container.resolve('fragment.FragmentLiveTag');
const FragmentLiveArrayTag: TagHandler = container.resolve('fragment.FragmentLiveArrayTag');
const FragmentLiveListTag: TagHandler = container.resolve('fragment.FragmentLiveListTag');

export class Fragment {
	line: string;
	fs_path: string;
	directory: string;
	document: undefined | vscode.TextDocument;
	static save: Function = CreateFragment.initFragment;
	static getTag: (file_name: string) => string = FragmentTag.getTag;
	static getNewFragment: (file_name: string) => string = (x) => new View.Fragment.View({ fragment_string: x }).toString();
	static Base: any = Fragment;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		this.directory = directory;
		this.fs_path = fs_path;
		this.line = line;
		return this;
	}
}

export class FragmentArray extends Fragment {
	static save: Function = CreateFragment.initFragment;
	static getTag: (file_name: string) => string = FragmentArrayTag.getTag;
	static getNewFragment: (file_name: string) => string = (x) => new View.FragmentArray.View({ fragment_string: x }).toString();
	static Base: any = FragmentArray;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};

export class FragmentList extends Fragment {
	static save: Function = CreateFragment.initFragment;
	static getTag: (file_name: string) => string = FragmentListTag.getTag;
	static getNewFragment: (file_name: string) => string = (x) => new View.FragmentList.View({ fragment_string: x }).toString();
	static Base: any = FragmentList;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};

export class FragmentLive extends Fragment {
	static save: Function = CreateFragment.initFragment;
	static getTag: (file_name: string) => string = FragmentLiveTag.getTag;
	static getNewFragment: (file_name: string) => string = (x) => new View.FragmentLive.View({ fragment_string: x }).toString();
	static Base: any = FragmentLive;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};

export class FragmentLiveArray extends Fragment {
	static save: Function = CreateFragment.initFragment;
	static getTag: (file_name: string) => string = FragmentLiveArrayTag.getTag;
	static getNewFragment: (file_name: string) => string = (x) => new View.FragmentLiveArray.View({ fragment_string: x }).toString();
	static Base: any = FragmentLiveArray;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};


export class FragmentLiveList extends Fragment {
	static save: Function = CreateFragment.initFragment;
	static getTag: (file_name: string) => string = FragmentLiveListTag.getTag;
	static getNewFragment: (file_name: string) => string = (x) => new View.FragmentLiveList.View({ fragment_string: x }).toString();
	static Base: any = FragmentLiveList;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};


export class FragmentUnknown extends Fragment {
	static save: Function = (x: any) => null;
	static getTag: (file_name: string) => string = (x) => '';
	static getNewFragment: (file_name: string) => string = (x) => `FragmentUnknown<${x}>`;
	static Base: any = FragmentUnknown;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		return this;
	};
};

@singleton()
export class Injection {
	Fragment = Fragment;
	FragmentList = FragmentList;
	FragmentArray = FragmentArray;
	FragmentLive = FragmentLive;
	FragmentLiveList = FragmentLiveList;
	FragmentLiveArray = FragmentLiveArray;
	FragmentUnknown = FragmentUnknown;
}