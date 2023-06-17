"use strict";

const {toCamelCase}    = require("@popovmp/camel-case");
const {parseJsonValue} = require("@popovmp/json-value-parser");

/**
 * Adds a key-value pair to an object in place
 * If the key already exists, it makes an array of values
 *
 * @param {Object} obj
 * @param {string} key
 * @param {*}      value
 *
 * @return {void}
 */
function addKeyValue(obj, key, value) {
    const val = parseJsonValue(value);

    if (obj.hasOwnProperty(key)) {
        if (Array.isArray(obj[key])) {
            obj[key].push(val);
        } else {
            obj[key] = [obj[key], val];
        }
    } else {
        obj[key] = val;
    }
}

/**
 * Parses the CLI options
 *
 * @param {string[]} argv
 *
 * @return {Object}
 */
function parse(argv) {
    const options = {};
    let   lastKey = "subcommand";

    for (const arg of argv) {
        const input = arg.trim();
        if (input === "=") {
            continue;
        }

        if (input.startsWith("--")) {
            const option = input.replace(/^--/, "");
            const match  = option.match(/^(.+)=(.+)$/);
            if (match) {
                lastKey = toCamelCase(match[1]);
                addKeyValue(options, lastKey, match[2]);
            } else {
                lastKey = toCamelCase(option);
            }
        } else {
            addKeyValue(options, lastKey, input);
        }
    }

    return options;
}

module.exports = {parse};
