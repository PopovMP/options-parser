# A Simple CLI Options Parser

Parses options.

Features:
 * Converts the keys to camel-case.
 * Collects multiple options in an array.
 * Converts the options to the correct data types: string, null, boolean, or number.

Input:
```shell
node foo --foo bar --foo-bar boo --FooBar 42 --foo_bar_baz null false 3.14 
```

Code:
```javascript
const {parceOptions} = require("@popovmp@options-parser");
const options = parseOptions();
console.log( JSON.stringify(options) );
```

Output:
```json
{
  "foo": "bar",
  "fooBar": ["boo", 42],
  "fooBarBaz": [null, false, 3.14]
}
```
