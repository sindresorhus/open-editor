import {PathLike} from 'line-column-path';

declare namespace openEditor {
	interface Options {
		/**
		Name, command, or binary path of the editor.

		Default: [Auto-detected](https://github.com/sindresorhus/env-editor).

		__Only use this option if you really have to.__ Can be useful if you want to force a specific editor or implement your own auto-detection.
		*/
		readonly editor?: string;
	}

	interface EditorRunConfig {
		/**
		Editor binary name.
		*/
		binary: string;

		/**
		Arguments provided to the editor binary.
		*/
		arguments: string[];

		/**
		A flag indicating whether the editor runs in the terminal.
		*/
		isTerminalEditor: boolean;
	}
}

declare const openEditor: {
	/**
	Open the given files in the user's editor at specific line and column if supported by the editor. It does not wait for the editor to start or quit.

	@param files - Items should be in the format `foo.js:1:5` or `{file: 'foo.js', line: 1: column: 5}`.

	@example
	```
	import openEditor = require('open-editor');

	openEditor([
		'unicorn.js:5:3',
		{
			file: 'readme.md',
			line: 10,
			column: 2
		}
	]);
	```
	*/
	(files: readonly PathLike[], options?: openEditor.Options): void;

	/**
	Same as `openEditor()`, but returns an object with the binary name, arguments, and a flag indicating whether the editor runs in the terminal.

	Can be useful if you want to handle opening the files yourself.

	@example
	```
	{binary: 'subl', arguments: ['foo.js:1:5'], isTerminalEditor: false}
	```
	*/
	make(
		files: readonly PathLike[],
		options?: openEditor.Options
	): openEditor.EditorRunConfig;
};

export = openEditor;
