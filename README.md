# action-u
Redux Action Generator (promoting action creators and types)

??? RETROFIT THIS

The [action-u] library promotes several redux reducer
composition utilities, which blend multiple reducers together forming
a richer abstraction through functional decomposition
(i.e. higher-order functions).

Reducer composition is not new.  Redux itself provides the innovative
[combineReducers](http://redux.js.org/docs/api/combineReducers.html)
utility which allows you to fuse individual reducers together to build
up the overall shape of your application state.

The most prevalent [action-u] utility is **reducerHash()**,
which lets you combine sub-reducers in such a way as to eliminate
the switch statement commonly used to delineate action type.  

**Additionally**, [action-u] promotes other reducer compositions that
can be used in conjunction with one another.

<!--- Badges for CI Builds ---> 
[![Build Status](https://travis-ci.org/KevinAst/action-u.svg?branch=master)](https://travis-ci.org/KevinAst/action-u)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ab82e305bb24440281337ca3a1a732c0)](https://www.codacy.com/app/KevinAst/action-u?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KevinAst/action-u&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/ab82e305bb24440281337ca3a1a732c0)](https://www.codacy.com/app/KevinAst/action-u?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KevinAst/action-u&amp;utm_campaign=Badge_Coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/kevinast/action-u/badge.svg)](https://snyk.io/test/github/kevinast/action-u)
[![NPM Version Badge](https://img.shields.io/npm/v/action-u.svg)](https://www.npmjs.com/package/action-u)

## Comprehensive Documentation

Complete documentation can be found at
https://action-u.js.org/, which includes both **API** details,
and a **Dev Guide** with full and thorough **examples**!


## Install

```shell
npm install --save action-u
```


## Examples

### Basics

The following example uses **reducerHash()** to combine a set of
sub-reducer functions (indexed by the standard action.type),
eliminating the switch statement commonly used to delineate action
type.

**Don't miss the [action-u] documentation**, *which fully explores
this example, and details the API.*

```js
import { reducerHash } from 'action-u';

export default reducerHash({
  "widget.edit":       (widget, action) => action.widget,
  "widget.edit.close": (widget, action) => null,
}, null);
```


### Joining Reducers

Building on the previous example, our widget now takes on more detail:
 - we manage x/y properties (through the standard
   [combineReducers](http://redux.js.org/docs/api/combineReducers.html))
 - the widget itself can take on a null value (an indication it is NOT
   being edited)

We manage these new requirements by combining multiple reducers
through a functional decomposition (as opposed to procedural code).
To accomplish this, we add to our repertoire by introducing
**joinReducers()** and **conditionalReducer()**.

**Did I mention that the [action-u] documentation**, *fully explores
this example, and details the API?*

```js
import * as Redux         from 'redux';
import * as AstxReduxUtil from 'action-u';
import x                  from '../appReducer/x';
import y                  from '../appReducer/y';

export default AstxReduxUtil.joinReducers(
  // FIRST: determine content shape (i.e. {} or null)
  AstxReduxUtil.reducerHash({
    "widget.edit":       (widget, action) => action.widget,
    "widget.edit.close": (widget, action) => null
  }),

  AstxReduxUtil.conditionalReducer(
    // SECOND: maintain individual x/y fields
    //         ONLY when widget has content (i.e. is being edited)
    (widget, action, originalReducerState) => widget !== null,
    Redux.combineReducers({
      x,
      y
    })),

  null); // initialState
```

### Full Example

Building even more on the prior examples:
 - our widget adds a curHash property (which is a determinate of
   whether application content has changed)

We manage this new property in the parent widget reducer, because it
has a unique vantage point of knowing when the widget has changed
(under any circumstance, regardless of how many properties are
involved).

We accomplish this by simply combining yet another reducer (using a
functional approach).  This also demonstrates how **composition can be
nested!**

**Read all about it!  The [action-u] documentation** *fully explores
this example, and details the API.*

```js
import * as Redux         from 'redux';
import * as AstxReduxUtil from 'action-u';
import x                  from '../appReducer/x';
import y                  from '../appReducer/y';
import Widget             from '../appReducer/Widget';

export default AstxReduxUtil.joinReducers(
  // FIRST: determine content shape (i.e. {} or null)
  AstxReduxUtil.reducerHash({
    "widget.edit":       (widget, action) => action.widget,
    "widget.edit.close": (widget, action) => null
  }),

  AstxReduxUtil.conditionalReducer(
    // NEXT: maintain individual x/y fields
    //       ONLY when widget has content (i.e. is being edited)
    (widget, action, originalReducerState) => widget !== null,
    AstxReduxUtil.joinReducers(
      Redux.combineReducers({
        x,
        y,
        curHash: (s=null)=>s // defaulted state placebo reducer (needed by combineReducers())
      }),
      AstxReduxUtil.conditionalReducer(
        // LAST: maintain curHash
        //       ONLY when widget has content (see condition above) -AND- has changed
        (widget, action, originalReducerState) => originalReducerState !== widget,
        (widget, action) => {
          widget.curHash = Widget.hash(widget); // OK to mutate (because of changed instance)
          return widget;
        })
    )
  ), null); // initialState
```

This represents a very comprehensive example of how **Reducer
Composition** can **simplify your life**!  We have combined multiple
reducers into one, applying conditional logic as needed through
functional decomposition!


[action-u]: https://action-u.js.org/