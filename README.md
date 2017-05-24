# action-u

The action-u library provides a utility that auto generates your
[redux] [action creators], and introduces organization to your
[actions] through a JSON-based [ActionStruct].  This structure
instinctively groups related actions, implicitly defines your action
types, and seamlessly promotes both [action creators] and action types
throughout your application.  This automates a tedious process, and
promotes an overall organization to your actions.

<!--- Badges for CI Builds ---> 
[![Build Status](https://travis-ci.org/KevinAst/action-u.svg?branch=master)](https://travis-ci.org/KevinAst/action-u)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/ab82e305bb24440281337ca3a1a732c0)](https://www.codacy.com/app/KevinAst/action-u?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KevinAst/action-u&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/ab82e305bb24440281337ca3a1a732c0)](https://www.codacy.com/app/KevinAst/action-u?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KevinAst/action-u&amp;utm_campaign=Badge_Coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/kevinast/action-u/badge.svg)](https://snyk.io/test/github/kevinast/action-u)
[![NPM Version Badge](https://img.shields.io/npm/v/action-u.svg)](https://www.npmjs.com/package/action-u)


## Install

```shell
npm install --save action-u
```


## Sample

As a simple example, let's say we want to facilitate an activity to
display a user message.  We will need:
- an action to display the message in a dialog, 
- and a corresponding action to close the dialog.


**Generation**:

By simply knowing the properties of each action, we can auto-generate
our needed [ActionStruct] as follows:

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

Because our two actions are inner-related, we packaged them in an
app-specific structure that highlights these relationship through it's
shape.  The `actions` [ActionStruct] *(returned above)* conceptually
looks like this:

```js
const actions = {
  userMsg {
    display(msg): {},
    close():      {},
  }
};
```

1. The **action creator** signatures are shown, but their
   implementations are omitted.

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

**A Closer Look**

The following diagram summarizes the generation process

![userMsg](docs/img/userMsg.png)

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


**Usage**:

Here is how the generated [ActionStruct] *(above)* is used:

```js
const userMsg = actions.userMsg.display('Hello action-u');
      // yields the following action (which can be dispatched):
      //   {
      //     type: 'userMsg.display',
      //     msg:  'Hello action-u'
      //   }

const closeIt = actions.userMsg.close();
      // yields the following action (which can be dispatched):
      //   {
      //     type: 'userMsg.close'
      //   }

// typically used in reducers
console.log(`First  type is '${actions.userMsg.display}'`); // First  type is 'userMsg.display'
console.log(`Second type is '${actions.userMsg.close}'`);   // Second type is 'userMsg.close'
```


## Comprehensive Documentation

The sample above just scratches the service!

**Comprehensive Documentation** can be found at https://action-u.js.org/,
which includes both a **Dev Guide** *(building concepts with full and
thorough **examples**)*, and a complete **API Reference**.

There is much more to cover in fully understanding this utility,
including:

- [ActionStruct Shapes] ... there is a lot of flexibility in how you
  organize your [ActionStruct]

- [Parameter Validation] ... learn how to inject app-specific
  validation

- [Defaulting Parameters] ... learn how to apply default semantics to
  your action creator parameters

- [Action Promotion] ... options to maintain and promote the
  actions within your application

- [Action Documentation] ... considerations for documenting your
  actions

- [API Reference] ... and *(of course)* the complete functional **API
  Reference**


The action-u library was pulled from a sandbox project
([GeekU](https://github.com/KevinAst/GeekU)) that I use to study
several technologies and frameworks.

I hope you enjoy this effort, and comments are always welcome.

&lt;/Kevin&gt;



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
