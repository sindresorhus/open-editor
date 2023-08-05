import {expectType} from 'tsd';
import openEditor, {getEditorInfo, EditorInfo} from './index.js';

void openEditor([
	'unicorn.js:5:3',
	{
		file: 'readme.md',
		line: 10,
		column: 2,
	},
]);

void openEditor(
	[
		'unicorn.js:5:3',
		{
			file: 'readme.md',
			line: 10,
			column: 2,
		},
	],
	{editor: 'vi'},
);

expectType<EditorInfo>(
	getEditorInfo([
		'unicorn.js:5:3',
		{
			file: 'readme.md',
			line: 10,
			column: 2,
		},
	]),
);

expectType<EditorInfo>(
	getEditorInfo(
		[
			'unicorn.js:5:3',
			{
				file: 'readme.md',
				line: 10,
				column: 2,
			},
		],
		{editor: 'vi'},
	),
);
