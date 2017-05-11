# Basics

As a simple example, let's say we want to display a user message.  We
will need:
- an action to display the message in a dialog, 
- and a corresponding action to close the dialog.

Because these two actions are inner-related, we will package them in
an app-specific structure that highlights these relationship through
it's shape.  Here is the ActionStruct that will eventually be
auto-generated:

```js
const actions = {
  userMsg {
    display(msg): {}, // action creator - type promoted via string coercion of funct
    close():      {}, // action creator - type promoted via string coercion of funct
  }
};
```

The action creator implementations are ommitted.

1. `actions.userMsg.display(msg)` is the **1st action creator**, and
   accepts a single `msg` parameter

1. `actions.userMsg.close()` is the **2nd action creator**, and
    accepts no parameters

1. **Action types** are implied from the JSON structure, and are promoted
   through a string coercion of the action creator function itself
   (i.e. the function's toString() has been overloaded).  In many
   contexts, this coercion happens implicitly (such as astx-redux-util
   reducerHash()), while in other cases it must be explicitly done (for
   example in a switch statement).

   ```js
   String(actions.userMsg.display) // yields: 'userMsg.display'
   ''+actions.userMsg.close        // yields: 'userMsg.close'
   ```


**Generation**:

The structure above is auto-generated through the `generateActions()`
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

1. The generateActions() function accepts a single ActionGenesis
   parameter that:

   - defines one or more action creators

   - implies the action types from the JSON structure

   - defines the overall ActionStruct organization 

1. ActionNodes (ones that promote action creator functions) are defined
   through the `actionMeta` property.

   - The `actionMeta.traits` property is a string array that defines
     *both* the parameter names (of the action creator) and ultimately
     the property names of the action (returned from the action
     creator).

   - An empty `actionMeta` object (see `close`) merely defines an
     action creator with NO parameters, and consequently no action
     payload properties.

   - There are more `actionMeta` properties that we will discuss
     later.

     **Formatting Preference**: So as to not confuse the actionMeta
     property with app-level nodes, I prefer to indent them a bit deeper in
     the structure *(you are free to disregard this advice)*.

1. All other nodes (like `userMsg`) are merely intermediate nodes that
   organize (i.e. add meaning) to the overall shape of the action
   structure.


**Usage**:

Here is how the generated ActionStruct *(above)* is used:

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
