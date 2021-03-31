import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as extension from '../../extension';

import * as Constant from '../../constant';

vscode.window.showInformationMessage('Start all tests.');

describe('Constants', () => {
	describe('Elixir Extension Patterns', () => {
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

	describe('Fragment Regular Expressions', () => {
		// ** NOT JUST IN TESTING **
		// Live must come after everything else because of the similar regular expressions. 
		// If you're confused, think in terms of `switch`, `case` statements, and how order matters.
		// ** NOT JUST IN TESTING **
		let test : RegExpMatchArray | null = ('=f{abc}'.match(Constant.FRAGMENT_REGEX) || []);
		it('Fragment Line Match', () => assert.ok(test && test[0] !== undefined));

		test = '=f{abc}'.match(Constant.FRAGMENT_GROUP_REGEX);
		test = test && test[1].match(/^abc$/);
		it('Fragment Group Match',() => assert.ok(test));

		test = ('=f{[a,b]}'.match(Constant.FRAGMENT_ARRAY_REGEX) || []);
		it('Fragment Array Line Match',() => assert.ok(test && test[0] !== undefined));

		test = '=f{[a,b]}'.match(Constant.FRAGMENT_ARRAY_GROUP_REGEX);
		test = test && test[1].match(/^a,b$/);
		it('Fragment Array Group Match',() => assert.ok(test));

		test = ('<a hello"there">=l{[a,b]}</a>'.match(Constant.FRAGMENT_LIST_GROUP_REGEX) || []);
		it('Fragment List Line Match',() => assert.ok(test && test[0] !== undefined));

		test = '<a hello"there">=l{[a,b]}</a>'.match(Constant.FRAGMENT_LIST_GROUP_REGEX);
		test = test && test[1].match(/^>=l\{\[a,b\]\}$/);
		it('Fragment List Group Match',() => assert.ok(test));

		test = ('=lf{abc}'.match(Constant.FRAGMENT_LIVE_REGEX) || []);
		it('Fragment Live Line Match', () => assert.ok(test && test[0] !== undefined));

		test = '=lf{abc}'.match(Constant.FRAGMENT_LIVE_GROUP_REGEX);
		test = test && test[1].match(/^abc$/);
		it('Fragment Live Group Match',() => assert.ok(test));

		test = ('=lf{[a,b]}'.match(Constant.FRAGMENT_LIVE_ARRAY_REGEX) || []);
		it('Fragment Live Array Line Match',() => assert.ok(test && test[0] !== undefined));

		test = '=lf{[a,b]}'.match(Constant.FRAGMENT_LIVE_ARRAY_GROUP_REGEX);
		test = test && test[1].match(/^a,b$/);
		it('Fragment Live Array Group Match',() => assert.ok(test));

		test = '<a hello"there">=ll{[a,b]}</a>'.match(Constant.FRAGMENT_LIVE_LIST_GROUP_REGEX);
		test && test[0] !== undefined;
		it('Fragment Live List Line Match',() => assert.ok(test));

		test = '<a hello"there">=ll{[a,b]}</a>'.match(Constant.FRAGMENT_LIVE_LIST_GROUP_REGEX);
		it('Fragment Live List Group Match',() => assert.strictEqual(test && test[1],'=ll{[a,b]}'));
	});
});