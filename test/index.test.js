'use strict'

const {strictEqual}  = require('assert')
const {describe, it} = require('@popovmp/mocha-tiny')
const {parse}        = require('../index.js')

describe('options-parser', () => {

	describe('parse', () => {
		it('parse a single option', () => {
			const input = ['--foo', 'bar']
			const output = JSON.stringify( parse(input) )
			strictEqual(output, '{"foo":"bar"}')
		})

		it('parse two options', () => {
			const input = ['--foo', 'bar', '--foo-bar', 'boo']
			const output = JSON.stringify( parse(input) )
			strictEqual(output, '{"foo":"bar","fooBar":"boo"}')
		})

		it('makes an array of values when an option is called twice', () => {
			const input = ['--foo', 'bar', '--foo-bar', 'boo', '--FooBar', '42']
			const output = JSON.stringify( parse(input) )
			strictEqual(output, '{"foo":"bar","fooBar":["boo",42]}')
		})

		it('adds consecutive values', () => {
			const input = ['--foo', 'null', 'true', 'false', '3.14', '-42']
			const output = JSON.stringify( parse(input) )
			strictEqual(output, '{"foo":[null,true,false,3.14,-42]}')
		})

		it('adds options with =', () => {
			const input = ['--foo=boo', 'null', '--foo=bar']
			const output = JSON.stringify( parse(input) )
			strictEqual(output, '{"foo":["boo",null,"bar"]}')
		})
	})
})
