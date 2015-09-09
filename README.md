# jsxpr
[Lisp in your language.][1]

A lisp implemented using arrays and functions in Javascript. If you're wondering why such an abomination exists, then go check out [the blog post][1] that is responsible for its inception.

## Examples
```js
["print", "Hello, World!"]

["defn", "greeting", ["name"],
  ["print", "Hello", "name"]]

["greeting", "Dan"]

["=", 5, 5]

["+", 10, 20]

["and", true, true]

["or", true, false]
```

## REPL
To use the REPL, clone the repository and run `npm install`. This will install the dependencies needed for running the REPL (chalk and readline).

Then running `./bin/repl` will start it up. See how it is used in the Asciicast below.

[![asciicast](https://asciinema.org/a/09hjbv3sudn2iff6gh2gldawx.png)](https://asciinema.org/a/09hjbv3sudn2iff6gh2gldawx)

[1]: http://danthedev.com/

