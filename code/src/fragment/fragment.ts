/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import * as FragmentTag from './controller/tag';
import * as CreateFragment from './controller/create';
import * as FragmentView from './view/fragment';

export class Fragment {
	line: string;
	fs_path: string;
	directory: string;
	document: undefined | vscode.TextDocument;
	save : Function = CreateFragment.initFragment;
	getTag : (x:string) => string = FragmentTag.fragmentTag;
	getNewFragment : (x:string) => string = FragmentView.fragmentView;
	Base: any;
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		this.directory = directory;
		this.fs_path = fs_path;
		this.line = line;
	}
}

export class FragmentArray extends Fragment {
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		this.getTag = FragmentTag.fragmentArrayTag;
		this.getNewFragment = FragmentView.fragmentArrayView;
		this.Base = FragmentArray;
	};
};

export class FragmentLive extends Fragment {
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		this.getTag = FragmentTag.fragmentLiveTag;
		this.getNewFragment = FragmentView.fragmentLiveView;
		this.Base = FragmentLive;
	};
};

export class FragmentLiveArray extends Fragment {
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		this.getTag = FragmentTag.fragmentLiveArrayTag;
		this.getNewFragment = FragmentView.fragmentLiveArrayView;
		this.Base = FragmentLiveArray;
	};
};

export class FragmentList extends Fragment {
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		this.getTag = FragmentTag.fragmentListTag;
		this.getNewFragment = FragmentView.fragmentListView;
		this.Base = FragmentList;
	};
};

export class FragmentLiveList extends Fragment {
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		this.getTag = FragmentTag.fragmentLiveListTag;
		this.getNewFragment = FragmentView.fragmentLiveListView;
		this.Base = FragmentLiveList;
	};
};

export class FragmentUnknown extends Fragment {
	constructor(directory: string = '', fs_path: string = '', line: string = '') {
		super(directory, fs_path, line);
		this.getTag = (x: string) => '';
		this.getNewFragment = (x: string) => '';
		this.Base = FragmentUnknown;
	};
};