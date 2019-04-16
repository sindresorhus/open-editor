'use strict';
const childProcess = require('child_process');
const envEditor = require('env-editor');
const lineColumnPath = require('line-column-path');
const opn = require('opn');

const make = (files, options = {}) => {
	if (!Array.isArray(files)) {
		throw new TypeError(`Expected an \`Array\`, got ${typeof files}`);
	}

	const editor = options.editor ? envEditor.get(options.editor) : envEditor.default();
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

		if (['webstorm', 'intellij'].indexOf(editor.id) !== -1) {
			args.push(lineColumnPath.stringify(parsed, {column: false}));
			continue;
		}

		if (editor.id === 'textmate') {
			args.push('--line', lineColumnPath.stringify(parsed, {
				file: false
			}), parsed.file);
			continue;
		}

		if (['vim', 'neovim'].indexOf(editor.id) !== -1) {
			args.push(`+call cursor(${parsed.line}, ${parsed.column})`, parsed.file);
			continue;
		}

		args.push(parsed.file);
	}

	return {
		bin: editor.bin,
		args,
		isTerminalEditor: editor.isTerminalEditor
	};
};

module.exports = (files, options) => {
	const result = make(files, options);
	const stdio = result.isTerminalEditor ? 'inherit' : 'ignore';

	const subProcess = childProcess.spawn(result.bin, result.args, {
		detached: true,
		stdio
	});

	// Fallback
	subProcess.on('error', () => {
		const result = make(files, {...options, editor: ''});

		for (const file of result.args) {
			opn(file);
		}
	});

	if (result.isTerminalEditor) {
		subProcess.on('exit', process.exit);
	} else {
		subProcess.unref();
	}
};

module.exports.make = make;
