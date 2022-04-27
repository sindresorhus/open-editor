# open-editor

> Open files in your editor at a specific line and column

Supports any editor, but only the following editors will open at a specific line and column:

- Sublime Text
- Atom
- Visual Studio Code
- VSCodium
- WebStorm*
- TextMate
- Vim
- NeoVim
- IntelliJ IDEA*

*\*Doesn't support column.*

## Install

```sh
npm install open-editor
```

## Usage

```js
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

await openEditor([
	'unicorn.js:5:3',
], { wait: true });
console.log('file was closed');
```

## API

### openEditor(files, options?)

Open the given files in the user's editor at specific line and column if supported by the editor. It does not wait for the editor to start or quit.

#### files

Type: `Array<string | object>`

Items should be in the format `foo.js:1:5` or `{file: 'foo.js', line: 1: column: 5}`.

#### options

Type: `object`

##### wait

Type: `boolean`\
Default: false

Wait until the edit process is finished (editor is closed).

##### editor

Type: `string`\
Default: [Auto-detected](https://github.com/sindresorhus/env-editor)

The name, command, or binary path of the editor.

**Only use this option if you really have to.** Can be useful if you want to force a specific editor or implement your own auto-detection.

### getEditorRunConfig(files, options?)

Same as `openEditor()`, but returns an object with the binary name, arguments, and a flag indicating whether the editor runs in the terminal.

Example: `{binary: 'subl', arguments: ['foo.js:1:5'], isTerminalEditor: false}`

Can be useful if you want to handle opening the files yourself.

```js
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

## Related

- [open-editor-cli](https://github.com/sindresorhus/open-editor-cli) - CLI for this module
- [open](https://github.com/sindresorhus/open) - Open stuff like URLs, files, executables
