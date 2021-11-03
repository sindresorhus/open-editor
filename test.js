import test from 'ava';
import {getEditorInfo} from './index.js';

const fixtureFiles = [
	'unicorn.js:10:20',
	'rainbow.js:43:4',
];

test('object input', t => {
	t.deepEqual(
		getEditorInfo(
			[
				{
					file: 'unicorn.js',
					line: 10,
					column: 20,
				},
				{
					file: 'rainbow.js',
					line: 43,
					column: 4,
				},
			],
			{
				editor: 'sublime',
			},
		),
		{
			binary: 'subl',
			arguments: fixtureFiles,
			isTerminalEditor: false,
		},
	);
});

test('editor - generic', t => {
	t.deepEqual(getEditorInfo(fixtureFiles, {editor: 'noop'}), {
		binary: 'noop',
		arguments: [
			'unicorn.js',
			'rainbow.js',
		],
		isTerminalEditor: false,
	});
});

test('editor - Sublime', t => {
	t.deepEqual(getEditorInfo(fixtureFiles, {editor: 'sublime'}), {
		binary: 'subl',
		arguments: fixtureFiles,
		isTerminalEditor: false,
	});
});

test('editor - Atom', t => {
	t.deepEqual(getEditorInfo(fixtureFiles, {editor: 'atom'}), {
		binary: 'atom',
		arguments: fixtureFiles,
		isTerminalEditor: false,
	});
});

test('editor - VS Code', t => {
	t.deepEqual(getEditorInfo(fixtureFiles, {editor: 'vscode'}), {
		binary: 'code',
		arguments: ['--goto', ...fixtureFiles],
		isTerminalEditor: false,
	});
});

test('editor - WebStorm', t => {
	t.deepEqual(getEditorInfo(fixtureFiles, {editor: 'webstorm'}), {
		binary: 'webstorm',
		arguments: [
			'unicorn.js:10',
			'rainbow.js:43',
		],
		isTerminalEditor: false,
	});
});

test('editor - TextMate', t => {
	t.deepEqual(getEditorInfo(fixtureFiles, {editor: 'textmate'}), {
		binary: 'mate',
		arguments: [
			'--line',
			'10:20',
			'unicorn.js',
			'--line',
			'43:4',
			'rainbow.js',
		],
		isTerminalEditor: false,
	});
});

test('editor - Vim', t => {
	t.deepEqual(getEditorInfo(fixtureFiles, {editor: 'vim'}), {
		binary: 'vim',
		arguments: [
			'+call cursor(10, 20)',
			'unicorn.js',
			'+call cursor(43, 4)',
			'rainbow.js',
		],
		isTerminalEditor: true,
	});
});

test('editor - NeoVim', t => {
	t.deepEqual(getEditorInfo(fixtureFiles, {editor: 'neovim'}), {
		binary: 'nvim',
		arguments: [
			'+call cursor(10, 20)',
			'unicorn.js',
			'+call cursor(43, 4)',
			'rainbow.js',
		],
		isTerminalEditor: true,
	});
});

test('editor - IntelliJ IDEA', t => {
	t.deepEqual(getEditorInfo(fixtureFiles, {editor: 'intellij'}), {
		binary: 'idea',
		arguments: [
			'unicorn.js:10',
			'rainbow.js:43',
		],
		isTerminalEditor: false,
	});
});
