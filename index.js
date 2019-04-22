'use strict';
const childProcess = require('child_process');
const envEditor = require('env-editor');
const lineColumnPath = require('line-column-path');
const open = require('open');

const make = (files, options = {}) => {
	if (!Array.isArray(files)) {
		throw new TypeError(`Expected an \`Array\`, got ${typeof files}`);
	}

	const editor = options.editor ? envEditor.getEditor(options.editor) : envEditor.defaultEditor();
	const editorArguments = [];

	if (editor.id === 'vscode') {
		editorArguments.push('--goto');
	}

	for (const file of files) {
		const parsed = lineColumnPath.parse(file);

		if (['sublime', 'atom', 'vscode'].indexOf(editor.id) !== -1) {
			editorArguments.push(lineColumnPath.stringify(parsed));
			continue;
		}

		if (['webstorm', 'intellij'].indexOf(editor.id) !== -1) {
			editorArguments.push(lineColumnPath.stringify(parsed, {column: false}));
			continue;
		}

		if (editor.id === 'textmate') {
			editorArguments.push('--line', lineColumnPath.stringify(parsed, {
				file: false
			}), parsed.file);
			continue;
		}

		if (['vim', 'neovim'].indexOf(editor.id) !== -1) {
			editorArguments.push(`+call cursor(${parsed.line}, ${parsed.column})`, parsed.file);
			continue;
		}

		editorArguments.push(parsed.file);
	}

	return {
		binary: editor.binary,
		arguments: editorArguments,
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
			open(file);
		}
	});

	if (result.isTerminalEditor) {
		subProcess.on('exit', process.exit);
	} else {
		subProcess.unref();
	}
};

module.exports.make = make;
