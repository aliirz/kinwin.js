# KinWin
## A minimalist DOM manipulation library.

### Usage

Just include kinwin.js inside your webpage like this:

`<script type="text/javascript" src="dist/kinwin.js"></script>`

All methods can be accessed using the `kw` operator like this:

`kw('.someClass').hide();`

### Available methods:

1. get
2. set
3. html
4. css
5. show
6. hide
7. append
8. prepend
9. remove

### Selectors

id and class syntax same as DOM API:
+ id: `kw.('#id-attribute')` returns node with matching id attribute value
+ class: `kw.('.class-attribute')` returns nodes with matching class attribute value

name attribute and tagName syntax requires special first characters:
+ name: `kw.('@name-attribute')` returns nodes with matching name attribute value
+ tag: `kw.('=tagname')` returns nodes with matching nodeName or tagName

### Test suite
"no frills" <a href="https://rawgit.com/aliirz/kinwin.js/master/test/suite.html" 
  target="_blank" title="opens new tab">__html test suite__</a> 
includes tiny `assert()` method patched on to the `kw` constructor.

#### Maybe someday&hellip;
+ attribute selectors? ( i.e., `kw('[attribute...]')')` ~ 7 flavors of attribute selector )
+ contextual selectors? ( i.e., `kw('thing').select('descendant-of-things')` )
+ pseudo-element &amp; pseudo-class
+ xpath or textContent or nodeValue selectors ( extra credit )
