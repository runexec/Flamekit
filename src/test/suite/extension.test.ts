import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as extension from '../../extension';

import * as Constant from '../../constant';

vscode.window.showInformationMessage('Start all tests.');

describe('Constants', () => {
	describe('Extension Patterns', () => {
		it('EXTENSION_EEX', () => assert.strictEqual(Constant.EXTENSION_EEX, 'eex'));
		it('EXTENSION_EEX != leex', () => assert.notStrictEqual(Constant.EXTENSION_EEX, 'leex'));
		it('EXTENSION_LEEX', () => assert.strictEqual(Constant.EXTENSION_LEEX, 'leex'));
		it('EXTENSION_LEEX != eex', () => assert.notStrictEqual(Constant.EXTENSION_LEEX, 'eex'));
		it('EXTENSION_EEX_REGEX', () => assert.ok('file.eex'.match(Constant.EXTENSION_EEX_REGEX)));
		it('EXTENSION_EEX_REGEX != leex', () => assert.strictEqual('file.leex'.match(Constant.EXTENSION_EEX_REGEX), null));
		it('EXTENSION_LEEX_REGEX', () => assert.ok('file.leex'.match(Constant.EXTENSION_LEEX_REGEX)));
		it('EXTENSION_LEEX_REGEX != eex', () => assert.strictEqual('file.eex'.match(Constant.EXTENSION_LEEX_REGEX), null));
		it('EXTENSION_REGEX', () => assert.ok(['file.eex','file.leex'].every(x => x.match(Constant.EXTENSION_REGEX))));
	});
});

describe('', () => {

});