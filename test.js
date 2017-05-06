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
		args: fixtureFiles
	});
});

test('editor - generic', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'noop'}), {
		bin: 'noop',
		args: [
			'unicorn.js',
			'rainbow.js'
		]
	});
});

test('editor - Sublime', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'sublime'}), {
		bin: 'subl',
		args: fixtureFiles
	});
});

test('editor - Atom', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'atom'}), {
		bin: 'atom',
		args: fixtureFiles
	});
});

test('editor - VS Code', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'vscode'}), {
		bin: 'code',
		args: ['--goto'].concat(fixtureFiles)
	});
});

test('editor - WebStorm', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'webstorm'}), {
		bin: 'wstorm',
		args: [
			'unicorn.js:10',
			'rainbow.js:43'
		]
	});
});

test('editor - TextMate', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'textmate'}), {
		bin: 'mate',
		args: [
			'--line', '10', 'unicorn.js',
			'--line', '43', 'rainbow.js'
		]
	});
});

test('editor - IntelliJ IDEA', t => {
	t.deepEqual(m.make(fixtureFiles, {editor: 'intellij'}), {
		bin: 'idea',
		args: [
			'unicorn.js:10',
			'rainbow.js:43'
		]
	});
});
