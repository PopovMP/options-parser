"use strict";

const {strictEqual}  = require("assert");
const {describe, it} = require("@popovmp/mocha-tiny");
const {parse}        = require("../index.js");

describe("options-parser", () => {

    describe("parse", () => {
        it("parse a single option", () => {
            const argv   = ["--foo", "bar"];
            const output = JSON.stringify(parse(argv));
            strictEqual(output, '{"foo":"bar"}');
        });

        it("parse two options", () => {
            const argv   = ["--foo", "bar", "--foo-bar", "boo"];
            const output = JSON.stringify(parse(argv));
            strictEqual(output, '{"foo":"bar","fooBar":"boo"}');
        });

        it("makes an array of values when an option is called twice", () => {
            const argv   = ["--foo", "bar", "--foo-bar", "boo", "--FooBar", "42"];
            const output = JSON.stringify(parse(argv));
            strictEqual(output, '{"foo":"bar","fooBar":["boo",42]}');
        });

        it("adds consecutive values", () => {
            const argv   = ["--foo", "null", "true", "false", "3.14", "-42"];
            const output = JSON.stringify(parse(argv));
            strictEqual(output, '{"foo":[null,true,false,3.14,-42]}');
        });

        it("adds options with =", () => {
            const argv   = ["--foo=boo", "null", "--foo=bar"];
            const output = JSON.stringify(parse(argv));
            strictEqual(output, '{"foo":["boo",null,"bar"]}');
        });

        it("parses a subcommand", () => {
            const argv   = ["foo"];
            const output = JSON.stringify(parse(argv));
            strictEqual(output, '{"subcommand":"foo"}');
        });

        it("parses multiple subcommands", () => {
            const argv   = ["foo", "bar", "baz"];
            const output = JSON.stringify(parse(argv));
            strictEqual(output, '{"subcommand":["foo","bar","baz"]}');
        });
    });
});
