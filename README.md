# xAutolink
[autolink-js](https://github.com/bryanwoods/autolink-js) using modern js

Replaces URLs in text with links

## Usage
```
import xAutolink from 'xAutolink'

xAutolink(text, options)
```

## Options
Options supports an object of key values that will be added as attributes to the replaced element

### Callback
One exception is `callback`.
It accepts a function with the url as an argument and needs to return a string.
It can be used to replace specific URLs in different ways:

```
xAutolink('http://example.com/1.gif')
// output: '<a href=\'http://example.com/1.gif\'>http://example.com/1.gif</a>'

function callback(url) {
  return /\.(gif)$/i.test(url) ? `<img src='${url}'>` : null
}
xAutolink('http://example.com/1.gif', { callback })
// output: '<img src=\'http://example.com/1.gif\'>'
```


## Examples
```
xAutolink('http://example.com')
// output : '<a href=\'http://example.com\'>http://example.com</a>'

xAutolink('http://example.com', { target: '_blank' })
// output: '<a href=\'http://example.com\' target=\'_blank\'>http://example.com</a>'

xAutolink('http://example.com', { target: '_blank', rel: 'noopener noreferrer' })
// output: '<a href=\'http://example.com\' target=\'_blank\' rel=\'noopener noreferrer\'>http://example.com</a>'

const callback = function (url) {
  return /\.(gif|png|jpe?g)$/i.test(url) ? `<img src='${url}'>` : null
}

xAutolink('http://example.gif', { callback })
// output: '<img src=\'http://example.gif\'>'

xAutolink('http://example.png', { callback })
// output: '<img src=\'http://example.png\'>'

xAutolink('http://example.jpg', { callback })
// output: '<img src=\'http://example.jpg\'>'

xAutolink('http://example.jpeg', { callback })
// output: '<img src=\'http://example.jpeg\'>'
```
