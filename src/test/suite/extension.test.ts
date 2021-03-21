import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as extension from '../../extension';

import * as __C from '../../constants';

vscode.window.showInformationMessage('Start all tests.');

describe('Constants', () => {
	describe('EXTENSION', () => {
		it('EXTENSION_EEX', () => assert.strictEqual(__C.EXTENSION_EEX, 'eex'));
		it('EXTENSION_LEEX', () => assert.strictEqual(__C.EXTENSION_LEEX, 'leex'));
		it('EXTENSION_EEX_REGEX', () => assert.ok('file.eex'.match(__C.EXTENSION_EEX_REGEX)));
		it('EXTENSION_LEEX_REGEX', () => assert.ok('file.leex'.match(__C.EXTENSION_LEEX_REGEX)));
		it('EXTENSION_REGEX', () => assert.ok(['file.eex','file.leex'].map(x => x.match(__C.EXTENSION_REGEX)).some(x => x)));
	});
});
