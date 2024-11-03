# beepbeep [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![javascript style guide][standard-image]][standard-url]

[travis-image]: https://img.shields.io/travis/Zodiase/beepbeep/master.svg
[travis-url]: https://travis-ci.org/Zodiase/beepbeep
[npm-image]: https://img.shields.io/npm/v/@xch/beepbeep.svg
[npm-url]: https://npmjs.org/package/@xch/beepbeep
[downloads-image]: https://img.shields.io/npm/dm/@xch/beepbeep.svg
[downloads-url]: https://npmjs.org/package/@xch/beepbeep
[standard-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[standard-url]: https://standardjs.com

Make a console beep sound. *Well-tested, web-scale, cloud-based, restful node.js module.*

## Usage

```javascript
var beep = require('@xch/beepbeep')

beep()
// Beep!

beep(2)
// Beep! Beep!

beep(3, 1000)
// Beep! ... Beep! ... Beep!

beep([1000, 500, 2000])
// 1 second delay...Beep! 0.5 second delay...Beep! 2 second delay...Beep!

beep([1000, 500, 2000])
// Beeps will queue up nicely. These will happen after the previous beeps are done.

var beep2 = beep.createBeeper();

beep2([1000, 500, 2000])
// A new beeper will allow beeps to happen in parallel. These beeps will interleave the previous ones.
```

Note that a beep takes up some time and the specified intervals are only between the start of beeps.

## Installation

```
npm install @xch/beepbeep
```

## License

MIT. Copyright (c) (original author) [Feross Aboukhadijeh](http://feross.org), (maintainer) Xingchen Hong.
