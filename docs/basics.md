# Basics

As a simple example, let's say we want to facilitate an activity to
display a user message.  We will need:
- an action to display the message in a dialog, 
- and a corresponding action to close the dialog.

Because these two actions are inner-related, we will package them in
an app-specific structure that highlights these relationship through
it's shape.  Here is our {{book.api.ActionStruct}} that will
eventually be auto-generated:

```js
const actions = { // auto-generated (from generateActions() - below)
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

The structure above is auto-generated through the {{book.api.generateActions}}
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

1. The {{book.api.generateActions}} function accepts a single
   {{book.api.ActionGenesis}} parameter that:

   - defines one or more action creators

   - implies the action types from the JSON structure

   - defines the overall {{book.api.ActionStruct}} organization 

1. {{book.api.ActionNodes}} (ones that promote action creator functions) are defined
   through the {{book.api.actionMeta}} property.

   - The {{book.api.actionMetaDOTtraits}} property is a string array
     that defines *both* the parameter names (of the action creator)
     and ultimately the property names of the action (returned from
     the action creator).

   - An empty {{book.api.actionMeta}} object (see `close`) merely defines an
     action creator with NO parameters, and consequently no action
     payload properties.

   - There are more {{book.api.actionMeta}} properties that we will discuss
     later.

     **Formatting Preference**: So as to not confuse the {{book.api.actionMeta}}
     property with app-specific nodes, I prefer to indent them a bit deeper in
     the structure *(you are free to disregard this advice)*.

1. All other nodes (like `userMsg`) are merely intermediate nodes that
   organize (i.e. add meaning) to the overall shape of the action
   structure.


**Usage**:

Here is how the generated {{book.api.ActionStruct}} *(above)* is used:

```js
// action creators ...
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

// action types (typically used in reducers) ...
console.log(`First  type is '${actions.userMsg.display}'`); // yields: First  type is 'userMsg.display'
console.log(`Second type is '${actions.userMsg.close}'`);   // yields: Second type is 'userMsg.close'
```
