'use strict'

const process  = require('node:process');

const {toCamelCase}    = require('@popovmp/camel-case')
const {parseJsonValue} = require('@popovmp/json-value-parser')

/**
 * Parses the CLI options
 *
 * @param {string[]} [argv]
 *
 * @return {Object}
 */
function parse(argv)
{
	const options = {}
	let lastKey = 'subcommand'

	const args = argv || process.argv

	const pushValue = (key, value) => {
		const val = parseJsonValue(value)

		if ( Object.hasOwn(options, key) ) {
			if ( Array.isArray(options[key]) )
				options[key].push(val)
			else
				options[key] = [options[key], val]
		}
		else {
			options[key] = val
		}
	}

	for (const arg of args) {
		const input = arg.trim()

		if (input === '=') continue

		if ( input.startsWith('--') ) {
			const option = input.replace(/^--/, '')
			const match  = option.match(/^(.+)=(.+)$/)
			if (match) {
				lastKey = toCamelCase(match[1])
				pushValue(lastKey, match[2])
			}
			else {
				lastKey = toCamelCase(option)
			}
		}
		else {
			pushValue(lastKey, input)
		}
	}

	return options
}

module.exports = {
	parse
}
