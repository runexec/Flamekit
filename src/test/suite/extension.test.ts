import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as extension from '../../extension';

vscode.window.showInformationMessage('Start all tests.');
describe('#a', () => it('does things', () => assert.strictEqual(2, 1)));
