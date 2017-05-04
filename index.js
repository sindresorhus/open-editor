'use strict';
const childProcess = require('child_process');
const envEditor = require('env-editor');
const lineColumnPath = require('line-column-path');
const opn = require('opn');

const make = (files, opts) => {
	if (!Array.isArray(files)) {
		throw new TypeError(`Expected an \`Array\`, got ${typeof files}`);
	}

	opts = Object.assign({}, opts);

	const editor = opts.editor ? envEditor.get(opts.editor) : envEditor.default();
	const args = [];

	if (editor.id === 'vscode') {
		args.push('--goto');
	}

	for (const file of files) {
		const parsed = lineColumnPath.parse(file);

		if (['sublime', 'atom', 'vscode'].indexOf(editor.id) !== -1) {
			args.push(lineColumnPath.stringify(parsed));
			continue;
		}

		if (editor.id === 'webstorm') {
			args.push(lineColumnPath.stringify(parsed, {column: false}));
			continue;
		}

		if (editor.id === 'textmate') {
			args.push('--line', lineColumnPath.stringify(parsed, {
				file: false,
				column: false
			}), parsed.file);
			continue;
		}

		args.push(parsed.file);
	}

	return {
		bin: editor.bin,
		args
	};
};

module.exports = (files, opts) => {
	const result = make(files, opts);

	const cp = childProcess.spawn(result.bin, result.args, {
		detached: true,
		stdio: 'ignore'
	});

	// Fallback
	cp.on('error', () => {
		const result = make(files, Object.assign({}, opts, {editor: ''}));

		for (const file of result.args) {
			opn(file, {wait: false});
		}
	});

	cp.unref();
};

module.exports.make = make;
