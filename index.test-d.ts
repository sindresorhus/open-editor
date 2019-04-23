import {expectType} from 'tsd';
import openEditor = require('.');

const options: openEditor.Options = {};

openEditor([
	'unicorn.js:5:3',
	{
		file: 'readme.md',
		line: 10,
		column: 2
	}
]);
openEditor(
	[
		'unicorn.js:5:3',
		{
			file: 'readme.md',
			line: 10,
			column: 2
		}
	],
	{editor: 'vi'}
);

expectType<openEditor.EditorRunConfig>(
	openEditor.make([
		'unicorn.js:5:3',
		{
			file: 'readme.md',
			line: 10,
			column: 2
		}
	])
);
expectType<openEditor.EditorRunConfig>(
	openEditor.make(
		[
			'unicorn.js:5:3',
			{
				file: 'readme.md',
				line: 10,
				column: 2
			}
		],
		{editor: 'vi'}
	)
);
