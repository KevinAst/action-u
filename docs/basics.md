# Motivation -or- Intro -or- Background


Within the redux framework, actions are the basic building blocks that
facilitate application activity.  Actions follow a pre-defined
convention that promote an action type and a type-specific payload.
Best practices prescribe that actions should be created by action
creators (functions that return actions).

- ??link: redux: http://redux.js.org/
- ??link: actions: http://redux.js.org/docs/basics/Actions.html
- ??link: "action creator functions": http://redux.js.org/docs/basics/Actions.html#action-creators

While maintaining action creators is a simple task, it is tedious and
potentially error prone.  In addition, one has to define a set of
corresponding action types, and somehow promote these pairs
(creators/types) throughout your application.  And then there is the
question of organization: How does one intuitively model actions that
are inner-related?


- ?? "MONEY QUOTE" (WITH motivations/features)

The action-u library addresses all of these areas.  Not only does the
action-u library auto generate your action creators, but it introduces
organization to your actions through an ActionStruct (a JSON tree).
This ActionStruct is a key aspect of action-u, it:
- implicitly defines your action types, 
- instinctively groups related actions,
- and seamlessly promotes both action creators and types throughout
  your application.


- ?? "MONEY QUOTE" (WITHOUT motivations/features)

The action-u library provides a utility that auto generates your redux
action creators, and introduces organization to your actions through
an ActionStruct (a JSON tree).  This structure instinctively groups
related actions, implicitly defines your action types, and seamlessly
promotes both action creators and types throughout your application.
This automates a tedious process, and promotes an overall organization
to your actions.



# Basics

Let's take a simple example of displaying a user message.  We will
want an action to display the message in a dialog, and a corresponding
action to close the dialog.

Let's generate an ActionStruct that has two action creators:
 - `actions.userMsg.display(msg)`
 - `actions.userMsg.close()`

Conceptually, here is the ActionStruct that will be machine-generated:

```js
const actions = {
  userMsg {
    display: {    // display(msg) action creator (implementation omitted)
      type:       'userMsg.display',            // type promotion
      toString(): { return 'userMsg.display'; } // ditto
    },
    close: {      // close() action creator (implementation omitted)
      type:       'userMsg.close',            // type promotion
      toString(): { return 'userMsg.close'; } // ditto
    }
  }
}
```

1. `actions.userMsg.display(msg)` is the 1st action creator, and
   accepts a single `msg` parameter

1. `actions.userMsg.close()` is the 2nd action creator, and accepts no
    parameters

1. both action creator functions promote their corresponding type
   through a `.type` property *(and a `.toString()` overload)* that is
   implied from the JSON structure:

   ```js
   actions.userMsg.display.type // yields: 'userMsg.display'
   ''+actions.userMsg.close     // yields: 'userMsg.close' (via implicit .toString())
   ```

Here is how the ActionStruct *(above)* is generated and used:

```js
import {generateActions} from 'action-u';

// GENERATION:
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

// USAGE:
const userMsg = actions.userMsg.display('Hello action-u'); // dispatch this action
                                                           //   {
                                                           //     type: 'userMsg.display',
                                                           //     msg:  'Hello action-u'
                                                           //   }
const closeIt = actions.userMsg.close();                   // dispatch this action
                                                           //   {
                                                           //     type: 'userMsg.close'
                                                           //   }

console.log(`First  type is '${actions.userMsg.display}'`);    // yields: First  type is 'userMsg.display'
                                                               // ... NOTE: implicit toString() usage
console.log(`Second type is '${actions.userMsg.close.type}'`); // yields: Second type is 'userMsg.close'
```

1. The generateActions() function accepts a single ActionGenesis
   parameter.  This is a simple JSON structure that:

   - defines one or more action creators

   - implies the action types from the JSON structure

   - defines the overall action organization 

1. ActionNodes (ones that promote action creator functions) are defined
   through the `actionMeta` property.

   - The `actionMeta.traits` property is a string[] that defines
     *both* the parameter names (of the action creator) and ultimately
     the property names of the action (returned from the action
     creator).

   - An empty `actionMeta` object (see `close`) merely defines an
     action creator with NO parameters, and consequently no action
     payload properties.

   - There are more `actionMeta` properties that will be discussed
     later.

1. All other nodes (like `userMsg`) are merely intermediate nodes that
   organize (i.e. add meaning) to the overall shape of the action
   structure.






## Various ActionStruct Shapes

We have a lot of flexibility in how we organize our ActionStruct.

For example, ActionNodes (i.e. action creators) can even contain
sub-structure.  As a result, we could define the two actions *(above)*
by removing the `display` nomenclature, making the `userMsg` node an
action creator, that in turn holds other structure:

 - `actions.userMsg(msg)`
 - `actions.userMsg.close()`

This is accomplished as follows:

```js
import {generateActions} from 'action-u';

// GENERATION:
const actions = generateActions({
  userMsg: {
    actionMeta: {
      traits: ['msg']
    },
    close: {
      actionMeta: {}
    }
  }
});

// USAGE:
const userMsg = actions.userMsg('Hello action-u'); // dispatch this action
                                                   //   {
                                                   //     type: 'userMsg',
                                                   //     msg:  'Hello action-u'
                                                   //   }
const closeIt = actions.userMsg.close();           // dispatch this action
                                                   //   {
                                                   //     type: 'userMsg.close'
                                                   //   }

console.log(`First  type is '${actions.userMsg.type}'`);  // yields: First  type is 'userMsg'
console.log(`Second type is '${actions.userMsg.close}'`); // yields: Second type is 'userMsg.close'
                                                          // ... NOTE: implicit toString() usage
```




## ActionStruct Formatting Preference

So as to not confuse the actionMeta property with app-level nodes, I
prefer to indent it a bit deeper in the structure.  You are free to
disregard this advice *(some may think it a bit weird)*.

```js
const actions = generateActions({
  userMsg: {  actionMeta: {
                traits: ['msg']
              },
    close: {  actionMeta: {}
    }
  }
});
```



## A Closer Look

The basic process of action-u is fairly straight forward, however the
terminology can be a bit confusing when you try to apply more a formal
definition that chronicles the process.

Part of the problem is we are dealing with a data structure that
has depth, and includes arbitrary app-level nodes that have
meaning only to the application.

Another intricacy is we are dealing with two parallel structures:
 - one containing the meta information that describes what will be generated
 - the other parallels the first, but is used by the app at run-time

As the saying goes: *"a picture is worth a thousand words"*.  The
following picture chronicles our prior example, highlighting the
formal types.

??? DRAW SVG PICTURE:

```
META
ActionGenisis@@
=============
{
  userMsg: {
    actionMeta: {      <<< ActionMeta@@
      traits: ['msg']
    },
    close: {
      actionMeta: {}   <<< ActionMeta@@
    }
  }
}


---> action-u generateActions() --->

RUN-TIME
ActionStruct@@
============
{
  userMsg: {      // userMsg(msg) action creator  <<< ActionNode@@
    type:         'userMsg',
    toString():   { return 'userMsg'; },
    close: {      // close() action creator       <<< ActionNode@@
      type:       'userMsg.close',
      toString(): { return 'userMsg.close'; }
    }
  }
}

```






## ?? discuss OTHER actionMeta options




## ?? discuss various ways to promote actions (modules - one or more)
