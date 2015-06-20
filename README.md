#KinWin
##A minimalist DOM manipulation library.

###Usage

Just include kinwin.js inside your webpage like this:

`<script type="text/javascript" src="dist/kinwin.js"></script>`

All methods can be accessed using the `kw` operator like this:

`kw('.someClass').hide();`

###Available methods:

1. get
2. set
3. html
4. css
5. show
6. hide
7. append
8. prepend
9. remove

###selectors

+ id: `kw.('#id-attribute')`
+ class: `kw.('.class-attribute')`
+ name: `kw.('@name-attribute')`
+ tag: `kw.('=tagname')`

###test.html
Includes tiny assert() method patched on to the `kw` constructor.
[test.html](./test/suite.html)
