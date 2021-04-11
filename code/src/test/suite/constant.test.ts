import * as vscode from 'vscode';
import * as assert from 'assert';
import 'reflect-metadata';
import { container } from 'tsyringe';

import * as Service from '../../service';

Service.init();

const Constant: Map<string, any> = container.resolve('ConstantInstance');

describe('Constant', () => {

	describe('Constant Injection', () => {
		it('Not undefined', () => assert.ok(Constant != undefined));
	});

	// Note: not strict checking by design	
	describe('Elixir Extension Patterns', () => {
		it('EXTENSION_EEX', () => { assert.equal(Constant.get('EXTENSION_EEX'), 'eex'); });
		it('EXTENSION_EEX != leex', () => assert.ok(Constant.get('EXTENSION_EEX') !== 'leex'));
		it('EXTENSION_LEEX', () => assert.ok(Constant.get('EXTENSION_LEEX') === 'leex'));
		it('EXTENSION_LEEX != eex', () => assert.ok(Constant.get('EXTENSION_LEEX') != 'eex'));
		it('EXTENSION_EEX_REGEX', () => assert.ok('file.eex'.match(Constant.get('EXTENSION_EEX_REGEX'))));
		it('EXTENSION_EEX_REGEX != leex', () => assert.ok('file.leex'.match(Constant.get('EXTENSION_EEX_REGEX')) == null));
		it('EXTENSION_LEEX_REGEX', () => assert.ok('file.leex'.match(Constant.get('EXTENSION_LEEX_REGEX'))));
		it('EXTENSION_LEEX_REGEX != eex', () => assert.ok('file.eex'.match(Constant.get('EXTENSION_LEEX_REGEX')) == null));
		it('EXTENSION_REGEX', () => assert.ok(['file.eex', 'file.leex'].every(x => x.match(Constant.get('EXTENSION_REGEX')))));
	});

	describe('Fragment Regular Expressions', () => {
		// ** NOT JUST IN TESTING **
		// Live must come after everything else because of the similar regular expressions. 
		// If you're confused, think in terms of `switch`, `case` statements, and how order matters.
		// ** NOT JUST IN TESTING **
		let test: RegExpMatchArray | null = '=f{abc}'.match(Constant.get('FRAGMENT_REGEX'))
		it('Fragment Line Match', () => assert.ok(test !== undefined));

		test = '=f{abc}'.match(Constant.get('FRAGMENT_GROUP_REGEX'));
		test = test && test[1].match(/^abc$/);
		it('Fragment Group Match', () => assert.ok(test));

		test = ('=f{[a,b]}'.match(Constant.get('FRAGMENT_ARRAY_REGEX')) || []);
		it('Fragment Array Line Match',
			() => assert.ok(test && test[0] !== undefined));

		test = '=f{[a,b]}'.match(Constant.get('FRAGMENT_ARRAY_GROUP_REGEX'));
		test = test && test[1].match(/^a,b$/);
		it('Fragment Array Group Match',
			() => assert.ok(test));

		test = ('<a hello"there">=l{[a,b]}</a>'.match(Constant.get('FRAGMENT_LIST_GROUP_REGEX')) || []);
		it('Fragment List Line Match',
			() => assert.ok(test && test[0] !== undefined));

		test = '<a hello"there">=l{[a,b]}</a>'.match(Constant.get('FRAGMENT_LIST_GROUP_REGEX'));
		test = test && test[1].match(/^>=l\{\[a,b\]\}$/);
		it('Fragment List Group Match',
			() => assert.ok(test));

		test = '<a hello="there">=l{[a,b]}</a>'.match(Constant.get('FRAGMENT_LISTSTRING_REGEX'));
		test = test && test[1].match(/^a hello="there"$/);
		it('Fragment ListString Match',
			() => assert.ok(test));

		test = '=l{[a,b]}'.match(Constant.get('FRAGMENT_LISTSTRING_REMOVE_BRACKETS_REGEX'));
		it('Fragment ListString Remove Brackets Match',
			() => assert.ok(test && test.every(x => x === '=ll' || x === '{[' || x === ']}')));

		test = ('=lf{abc}'.match(Constant.get('FRAGMENT_LIVE_REGEX')) || []);
		it('Fragment Live Line Match',
			() => assert.ok(test && test[0] !== undefined));

		test = '=lf{abc}'.match(Constant.get('FRAGMENT_LIVE_GROUP_REGEX'));
		test = test && test[1].match(/^abc$/);
		it('Fragment Live Group Match',
			() => assert.ok(test));

		test = ('=lf{[a,b]}'.match(Constant.get('FRAGMENT_LIVE_ARRAY_REGEX')) || []);
		it('Fragment Live Array Line Match',
			() => assert.ok(test && test[0] !== undefined));

		test = '=lf{[a,b]}'.match(Constant.get('FRAGMENT_LIVE_ARRAY_GROUP_REGEX'));
		test = test && test[1].match(/^a,b$/);
		it('Fragment Live Array Group Match',
			() => assert.ok(test));

		test = '<a hello="there">=ll{[a,b]}</a>'.match(Constant.get('FRAGMENT_LIVE_LIST_GROUP_REGEX'));
		test && test[0] !== undefined;
		it('Fragment Live List Line Match',
			() => assert.ok(test));

		test = '<a hello="there">=ll{[a,b]}</a>'.match(Constant.get('FRAGMENT_LIVE_LIST_GROUP_REGEX'));
		test = test && test[1].match(/^=ll\{\[a,b\]\}$/);
		it('Fragment Live List Group Match',
			() => assert.ok(test));

		test = '<a hello="there">=ll{[a,b]}</a>'.match(Constant.get('FRAGMENT_LIVE_LISTSTRING_REGEX'));
		test = test && test[1].match(/^a hello="there"$/);
		it('Fragment Live ListString Match',
			() => assert.ok(test));

		test = '=ll{[a,b]}'.match(Constant.get('FRAGMENT_LIVE_LISTSTRING_REMOVE_BRACKETS_REGEX'));
		it('Fragment Live ListString Remove Brackets Match',
			() => assert.ok(test && test.every(x => x === '=ll' || x === '{[' || x === ']}')));
	});
});