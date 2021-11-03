import process from 'node:process';
import execa from 'execa';
import {getEditor, defaultEditor} from 'env-editor';
import {parseLineColumnPath, stringifyLineColumnPath} from 'line-column-path';
import open from 'open';

export function getEditorInfo(files, options = {}) {
	if (!Array.isArray(files)) {
		throw new TypeError(`Expected an \`Array\`, got ${typeof files}`);
	}

	const editor = options.editor ? getEditor(options.editor) : defaultEditor();
	const editorArguments = [];

	if (editor.id === 'vscode') {
		editorArguments.push('--goto');
	}

	for (const file of files) {
		const parsed = parseLineColumnPath(file);

		if (['sublime', 'atom', 'vscode'].includes(editor.id)) {
			editorArguments.push(stringifyLineColumnPath(parsed));
			continue;
		}

		if (['webstorm', 'intellij'].includes(editor.id)) {
			editorArguments.push(stringifyLineColumnPath(parsed, {column: false}));
			continue;
		}

		if (editor.id === 'textmate') {
			editorArguments.push('--line', stringifyLineColumnPath(parsed, {
				file: false,
			}), parsed.file);
			continue;
		}

		if (['vim', 'neovim'].includes(editor.id)) {
			editorArguments.push(`+call cursor(${parsed.line}, ${parsed.column})`, parsed.file);
			continue;
		}

		editorArguments.push(parsed.file);
	}

	return {
		binary: editor.binary,
		arguments: editorArguments,
		isTerminalEditor: editor.isTerminalEditor,
	};
}

export default function openEditor(files, options) {
	const result = getEditorInfo(files, options);
	const stdio = result.isTerminalEditor ? 'inherit' : 'ignore';

	const subprocess = execa(result.binary, result.arguments, {
		detached: true,
		stdio,
	});

	// Fallback
	subprocess.on('error', () => {
		const result = getEditorInfo(files, {
			...options,
			editor: '',
		});

		for (const file of result.arguments) {
			open(file);
		}
	});

	if (result.isTerminalEditor) {
		subprocess.on('exit', process.exit);
	} else {
		subprocess.unref();
	}
}
