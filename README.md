# action-u

Within the [redux] framework, [actions] are the
basic building blocks that facilitate application activity.  Actions
follow a pre-defined convention that promote an action type and a
type-specific payload.  Best practices prescribe that actions should
be created by [action creators] (functions that return
actions).

While writing [action creators] is a simple task, it is tedious and
potentially error prone.  In addition, one has to define a set of
corresponding action types, and somehow promote these pairs
(creators/types) throughout your application.  And then there is the
question of organization: How does one intuitively model actions that
are inner-related?

The action-u library addresses all of these areas.  Not only does it
auto generate your [action creators], but it introduces organization to
your actions through a JSON-based [ActionStruct].  This [ActionStruct] is
a key aspect of action-u, it:
- implicitly defines your action types, 
- instinctively groups related actions,
- and seamlessly promotes both [action creators] and types throughout
  your application.


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


## Sample

As a simple example, let's say we want to facilate an activity to
display a user message.  We will need:
- an action to display the message in a dialog, 
- and a corresponding action to close the dialog.

Because these two actions are inner-related, we will package them in
an app-specific structure that highlights these relationship through
it's shape.  Here is our [ActionStruct] that will
eventually be auto-generated:

```js
const actions = {
  userMsg {
    display(msg): {},
    close():      {},
  }
};
```

1. The **action creator** signatures are shown, but their
   implementations are ommitted.

   - `actions.userMsg.display(msg)` is the **1st action creator**, and
     accepts a single `msg` parameter

   - `actions.userMsg.close()` is the **2nd action creator**, and
      accepts no parameters

1. The **action types** are implied from the JSON structure, and are
   promoted through a string coercion of the action creator function
   itself (the function's toString() has been overloaded).

   In many contexts, this coercion happens implicitly *(such as
   astx-redux-util reducerHash())*, while in other cases it must be
   explicitly done *(for example, the case of a switch statement)*.

   ```js
   String(actions.userMsg.display) // yields: 'userMsg.display'
   ''+actions.userMsg.close        // yields: 'userMsg.close'
   ```


**Generation**:

The structure above is auto-generated through the [generateActions]
function.  

```js
import {generateActions} from 'action-u';

const actions = generateActions({
  userMsg: {
    display: {
                actionMeta: {
                  traits: ['msg']
                }
    },
    close: {
                actionMeta: {}
    }
  }
});
```

1. The [generateActions] function accepts a single
   [ActionGenesis] parameter that:

   - defines one or more action creators

   - implies the action types from the JSON structure

   - defines the overall [ActionStruct] organization 

1. [ActionNodes] (ones that promote action creator functions) are defined
   through the [actionMeta] property.

   - The [actionMeta.traits] property is a string array
     that defines *both* the parameter names (of the action creator)
     and ultimately the property names of the action (returned from
     the action creator).

   - An empty [actionMeta] object (see `close`) merely defines an
     action creator with NO parameters, and consequently no action
     payload properties.

   - There are more [actionMeta] properties that we will discuss
     later.

     **Formatting Preference**: So as to not confuse the [actionMeta]
     property with app-level nodes, I prefer to indent them a bit deeper in
     the structure *(you are free to disregard this advice)*.

1. All other nodes (like `userMsg`) are merely intermediate nodes that
   organize (i.e. add meaning) to the overall shape of the action
   structure.



**A Closer Look**

The following diagram details the generation process

![userMsg](docs/img/userMsg.png)


**Usage**:

Here is how the generated [ActionStruct] *(above)* is used:

```js
const userMsg = actions.userMsg.display('Hello action-u');
      // yeilds the following action (which can be dispatched):
      //   {
      //     type: 'userMsg.display',
      //     msg:  'Hello action-u'
      //   }

const closeIt = actions.userMsg.close();
      // yeilds the following action (which can be dispatched):
      //   {
      //     type: 'userMsg.close'
      //   }

console.log(`First  type is '${actions.userMsg.display}'`); // yields: First  type is 'userMsg.display'
console.log(`Second type is '${actions.userMsg.close}'`);   // yields: Second type is 'userMsg.close'
```








## Full Docs

The sample above just scratches the service.  Please refer to the
full documentation ([action-u]) for a complete explaination of how you
can use this utility.  The topics that are covered include:

- [Getting Starter] ... installation and access

- Concepts:

  - [Basics] ... learn the basics of [generateActions]

  - [A Closer Look] ... a valuable diagram detailing
    exactly what is going on!

  - [ActionStruct Shapes] ... there is a lot of flexibility in how you
    organize your [ActionStruct]

  - [Parameter Validation] ... learn how to inject app-specific
    validation

  - [Defaulting Parameters] ... learn how to apply default semantics to
    your action creator parameters


- [API Reference] ... details the low-level functional API

- Organization:

  - [Action Promotion] ... options to maintain and promote the
    actions within your application

  - [Action Documentation] ... considerations for documenting your
    actions

- Misc:

  - [Distribution] ... where to find this utility **(and a local
    copy of the docs)**

  - [Why action-u?] ... why was action-u created, and how does it
    compare to other utilities

  - [Revision History] ... peruse various revisions

  - [MIT License] ... legal stuff




[action-u]:               https://action-u.js.org/
[Getting Started]:        https://action-u.js.org/start.html
[Basics]:                 https://action-u.js.org/basics.html
[A Closer Look]:          https://action-u.js.org/formalTypes.html
[ActionStruct Shapes]:    https://action-u.js.org/shapes.html
[Parameter Validation]:   https://action-u.js.org/validation.html
[Defaulting Parameters]:  https://action-u.js.org/default.html
[Action Promotion]:       https://action-u.js.org/promotion.html
[Action Documentation]:   https://action-u.js.org/actionDoc.html
[Distribution]:           https://action-u.js.org/dist.html
[Why action-u?]:          https://action-u.js.org/why.html
[Revision History]:       https://action-u.js.org/history.html
[MIT License]:            https://action-u.js.org/LICENSE.html
[API Reference]:          https://action-u.js.org/api.html
[generateActions]:        https://action-u.js.org/api.html#generateActions
[ActionNodes]:            https://action-u.js.org/api.html#ActionNodes
[ActionGenesis]:          https://action-u.js.org/api.html#ActionGenesis
[actionMeta]:             https://action-u.js.org/api.html#ActionMeta
[actionMeta.traits]:      https://action-u.js.org/api.html#ActionMeta
[ActionStruct]:           https://action-u.js.org/api.html#ActionStruct
[redux]:                  http://redux.js.org/
[actions]:                http://redux.js.org/docs/basics/Actions.html
[action creators]:        http://redux.js.org/docs/basics/Actions.html#action-creators
