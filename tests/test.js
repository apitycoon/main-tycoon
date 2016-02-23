'use strict';
//const test = require('tape');
const test = require('blue-tape');
const tapSpec = require('tap-spec');
const getData = require('./../controllers/cheerio');

test('getData runs', function (t) {
	t.ok( getData('http://www.berkshirehathaway.com', {
		name: 'test',
		string: 'div:nth-of-type(2) p:nth-of-type(1) a:nth-of-type(1)',
		text: false,
		attr: 'href'
	}, 'getData returns from URL'));
	t.end();
});
