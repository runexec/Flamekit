import 'reflect-metadata';
import { container, singleton } from 'tsyringe';
import * as vscode from 'vscode';

let Constant: Map<string, any>;

type Fragmenting = new (directory: string, fs_path: string, line: string) => {
	save: Function,
	getTag: (file_name: string) => string,
	getNewFragment: (file_name: string) => string,
	Base: any
};

interface FragmentLiveList extends Fragmenting {
    line: string,
	fs_path: string,
	directory: string,
    document: undefined | vscode.TextDocument
};

let FragmentLiveListFiles: {asArray: ({ file_name }: { file_name: string }) => string[]};

export async function createFragment(F: FragmentLiveList): Promise<void> {
	Constant = container.resolve('ConstantInstance');
	FragmentLiveListFiles = container.resolve('fragment.FragmentLiveListFiles');
	const new_files = FragmentLiveListFiles.asArray({ file_name: F.line }),
		paths = new_files.map(x => `${F.directory}${x.replace(/\.html/, '_live.html')}`),
		uris = new_files.map(x => vscode.Uri.parse(F.fs_path + x + '.' + Constant.get('EXTENSION_EX')));
	uris.forEach((uri, idx) => {
		const fp = paths[idx];
		const component_name = new_files[idx];
		vscode.workspace.fs.stat(uri).then((_) => { }, _ => {
			vscode.window.showInformationMessage(`Creating file: ${fp}`);
			vscode.workspace.fs.writeFile(uri, Buffer.from(contentTemplate(component_name), 'utf-8'));
		}).then(() => vscode.commands.executeCommand('runexecFlamekit.createCSS'));
	});
}

const contentTemplate = (name: string) => {
	const module_name = name.split('_').map(x => {
		let tmp = x.split('');
		tmp[0] = tmp[0].toLocaleUpperCase();
		return tmp.join('');
	}).join('');
	return `
defmodule ${module_name} do
  use Phoenix.LiveComponent

  def render(assigns) do
    ~L"""
    Inner block of ${module_name}
	<%= render_block(@inner_block, module_name: module_name) %>
    """
  end
end
`;
};

@singleton()
export class Injection {
	createFragment: (F: FragmentLiveList) => Promise<void> = createFragment;
}