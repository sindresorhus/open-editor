import test from 'ava';
import m from '.';

const fixtureFiles = [
	'unicorn.js:10:20',
	'rainbow.js:43:4'
];

test('object input', t => {
	t.deepEqual(m.make([{
		file: 'unicorn.js',
		line: 10,
		column: 20
	}, {
		file: 'rainbow.js',
		line: 43,
		column: 4
	}], {editor: 'sublime'}), {
		bin: 'subl',
		args: fixtureFiles,
		isTerminalEditor: false
	});
});

test('editor - generic', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'noop'}), {
		bin: 'noop',
		args: [
			'unicorn.js',
			'rainbow.js'
		],
		isTerminalEditor: false
	});
});

test('editor - Sublime', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'sublime'}), {
		bin: 'subl',
		args: fixtureFiles,
		isTerminalEditor: false
	});
});

test('editor - Atom', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'atom'}), {
		bin: 'atom',
		args: fixtureFiles,
		isTerminalEditor: false
	});
});

test('editor - VS Code', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'vscode'}), {
		bin: 'code',
		args: ['--goto'].concat(fixtureFiles),
		isTerminalEditor: false
	});
});

test('editor - WebStorm', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'webstorm'}), {
		bin: 'wstorm',
		args: [
			'unicorn.js:10',
			'rainbow.js:43'
		],
		isTerminalEditor: false
	});
});

test('editor - TextMate', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'textmate'}), {
		bin: 'mate',
		args: [
			'--line', '10', 'unicorn.js',
			'--line', '43', 'rainbow.js'
		],
		isTerminalEditor: false
	});
});

test('editor - IntelliJ IDEA', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'intellij'}), {
		bin: 'idea',
		args: [
			'unicorn.js:10',
			'rainbow.js:43'
		],
		isTerminalEditor: false
	});
});

test('editor - Vim', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'vim'}), {
		bin: 'vim',
		args: [
			'+call cursor(10, 20)', 'unicorn.js',
			'+call cursor(43, 4)', 'rainbow.js'
		],
		isTerminalEditor: true
	});
});

test('editor - NeoVim', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'neovim'}), {
		bin: 'nvim',
		args: [
			'+call cursor(10, 20)', 'unicorn.js',
			'+call cursor(43, 4)', 'rainbow.js'
		],
		isTerminalEditor: true
	});
});
