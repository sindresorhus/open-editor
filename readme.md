# open-editor [![Build Status](https://travis-ci.org/sindresorhus/open-editor.svg?branch=master)](https://travis-ci.org/sindresorhus/open-editor)

> Open files in your editor at a specific line and column

Supports any editor, but only the following editors will open at a specific line and column:

- Sublime Text
- Atom
- Visual Studio Code
- WebStorm*
- TextMate
- Vim
- NeoVim
- IntelliJ IDEA*

*\*Doesn't support column.*


## Install

```
$ npm install --save open-editor
```


## Usage

```js
const openEditor = require('open-editor');

openEditor([
	'unicorn.js:5:3',
	{
		file: 'readme.md',
		line: 10,
		column: 2
	}
]);
```


## API

### openEditor(files, [options])

Open the given files in the user's editor at specific line and column if supported by the editor. It does not wait for the editor to start or quit.

#### files

Type: `Array<string|Object>`

Items should be in the format `foo.js:1:5` or `{file: 'foo.js', line: 1: column: 5}`.

#### options

Type: `Object`

##### editor

Type: `string`<br>
Default: [Auto-detected](https://github.com/sindresorhus/env-editor)

Name, command, or binary path of the editor. Only use this option if you really have to.

Can be useful if you want to force a specific editor or implement your own auto-detection.

### openEditor.make(files, [options])

Same as `openEditor()`, but returns an object with the binary name, arguments, and a flag indicating whether the editor runs in the terminal.

Example: `{bin: 'subl', args: ['foo.js:1:5'], isTerminalEditor: false}`

Can be useful if you want to handle opening the files yourself.


## Related

- [open-editor-cli](https://github.com/sindresorhus/open-editor-cli) - CLI for this module
- [opn](https://github.com/sindresorhus/opn) - Opens stuff like websites, files, executables


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
