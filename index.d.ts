import {PathLike} from 'line-column-path';

export interface Options {
	/**
	The name, command, or binary path of the editor.

	Default: [Auto-detected](https://github.com/sindresorhus/env-editor).

	__Only use this option if you really have to.__ Can be useful if you want to force a specific editor or implement your own auto-detection.
	*/
	readonly editor?: string;

	/**
	Wait until the editor is closed.

	@default false

	@example
	```
	import openEditor from 'open-editor';

	await openEditor(['unicorn.js:5:3'], {wait: true});
	console.log('File was closed');
	```
	*/
	readonly wait?: boolean;
}

export interface EditorInfo {
	/**
	THe editor binary name.
	*/
	readonly binary: string;

	/**
	The arguments provided to the editor binary.
	*/
	readonly arguments: string[];

	/**
	A flag indicating whether the editor runs in the terminal.
	*/
	readonly isTerminalEditor: boolean;
}

/**
Open the given files in the user's editor at specific line and column if supported by the editor. It does not wait for the editor to start or quit unless you specify `wait: true` in the options.

@param files - Items should be in the format `foo.js:1:5` or `{file: 'foo.js', line: 1: column: 5}`.

@returns Promise<void> - If options.wait is true, the returned promise resolves as soon as the editor closes. Otherwise it resolves when the editor starts.

@example
```
import openEditor from 'open-editor';

openEditor([
	{
		file: 'readme.md',
		line: 10,
		column: 2,
	}
]);

openEditor([
	'unicorn.js:5:3',
]);
```
*/
export default function openEditor(files: readonly PathLike[], options?: Options): Promise<void>;

/**
Same as `openEditor()`, but returns an object with the binary name, arguments, and a flag indicating whether the editor runs in the terminal.

Can be useful if you want to handle opening the files yourself.

@example
```
import {getEditorInfo} from 'open-editor';

getEditorInfo([
	{
		file: 'foo.js',
		line: 1,
		column: 5,
	}
]);
//=> {binary: 'subl', arguments: ['foo.js:1:5'], isTerminalEditor: false}
```
*/
export function getEditorInfo(files: readonly PathLike[], options?: Options): EditorInfo;
