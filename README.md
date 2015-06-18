# phparr

Output PHP array from JavaScript object.

## Installation

```sh
npm install phparr
```

## Example

```javascript
var phparr = require('phparr');

var result = phparr({
  foo: 'FOO',
  bar: 'BAR',
  baz: [
    'QUX',
    1,
    true,
    null
  ]
});
console.log(result);
```

Output:

```
[
  "foo" => "FOO",
  "bar" => "BAR",
  "baz" => [
    "QUX",
    1,
    true,
    null
  ]
]
```

## License

MIT
