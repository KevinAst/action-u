# Thunk Action Creators

A popular technique to inject business logic into redux-enabled apps
are thunks.  [Thunks](https://github.com/gaearon/redux-thunk) provide
a mechanism to dispatch actions in either a delayed or conditional
manor.  Typically they are used in conjunction with asynchronous
processes, such as a server fetch, etc.

Thunks are introduced by promoting an action that is a function
*rather than an action object*.  In other words, the action creator
returns a function (i.e. the thunk), that is managed by the redux
thunk middleware.
- A thunk action creator accepts the app-specific contextual business
  parameters *(just like all action creators)*
- and when invoked returns a function (i.e. the thunk)
  * that will in turn be invoked by the redux thunk middleware
  * passing (dispatch, getState) parameters
  * giving the thunk access to both:
    - the contextual business parameters (through closure)
    - and the redux state and dispatch mechanisms


## Thunks in action-u

Within action-u, thunk action creators are injected into the
{{book.api.ActionStruct}} using the {{book.api.actionMetaDOTthunk}}
property.

```js
import {generateActions} from 'action-u';

const actions = generateActions({

  widget: {

    fetch: {      // widget.fetch(selCrit)
                  actionMeta: {
                    thunk(selCrit) {
                      return (dispatch, getState) => {
                        return fetchWidget(selCrit) // ... promise-based async fetch 
                          .then( widget => {
                            dispatch(actions.widget.fetch.complete(widget));
                          })
                          .catch ( err => {
                            dispatch(actions.widget.fetch.fail(err));
                          });
                      };
                    }
                  },

      complete: { // widget.fetch.complete(widget)
                  actionMeta: {
                    traits: ['widget']
                  }
      },

      fail: {     // widget.fetch.fail(err)
                  actionMeta: {
                    traits: ['err']
                  }
      }
    }
  }
});
```

The {{book.api.actionMetaDOTthunk}} property represents the **fully
implemented** action creator function, and is directly injected into
the {{book.api.ActionStruct}} as an {{book.api.ActionNode}}.  In other
words, there is **NO generation** *(in this case)*, rather the entire
action creator is fully defined by app-specific code.  This merely
allows thunk action creators to co-exist with all other *generated*
action creators in the {{book.api.ActionStruct}}.  As a result,
**_when a thunk is used, no other {{book.api.actionMeta}} properties
are allowed_**.

**Note 1**: Technically, a thunk is the function returned from a thunk
action creator, not the action creator itself.  With that said, we
simplify our terminology by using the {{book.api.actionMetaDOTthunk}}
property to refer to the thunk action creator.

**Note 2**: In reality, you can do anything in your app-defined thunk
action creator.  In other words, action-u provides no validation of
what your action creator does *(i.e. returns)*, rather it merely
injects it into the {{book.api.ActionStruct}} *as an
{{book.api.ActionNode}}*.  By design, it is intended to return a thunk
*(function)*, but nothing prevents it from returning, say an action
object *(you probably wouldn't do this, as it defeats the purpose of
auto generating your action creators)*.



## Thunk Modules

Because thunks typically contain several lines of code, it is common
to pull them in through a separate module.  Here is the same example
*(from above)*:

- **actions/thunks/widgetFetch.js**

  ```js
  import actions from '../../actions';

  export default function widgetFetch(selCrit) {
    return (dispatch, getState) => {
      return fetchWidget(selCrit) // ... promise-based async fetch 
        .then( widget => {
          dispatch(actions.widget.fetch.complete(widget));
        })
        .catch ( err => {
          dispatch(actions.widget.fetch.fail(err));
        });
    };
  }
  ```

- **actions/index.js**

  ```js
  import {generateActions} from 'action-u';
  import widgetFetch       from './thunks/widgetFetch';
  
  export default generateActions({
  
    widget: {
  
      fetch: {      // widget.fetch(selCrit)
                    actionMeta: {
                      thunk: widgetFetch
                    },
  
        complete: { // widget.fetch.complete(widget)
                    actionMeta: {
                      traits: ['widget']
                    }
        },
  
        fail: {     // widget.fetch.fail(err)
                    actionMeta: {
                      traits: ['err']
                    }
        }
      }
    }
  });
  ```



## SideBar: Thunk Alternatives

Thunks are merely **one way to inject business logic** into your
redux-enabled application ... **there are other techniques**!

Thunk support was added to action-u simply to allow thunk action
creators to consistently co-exist in the action-u ActionStruct *along
with all other action creators*.

I would encourage you to investigate the alternatives to thunks.  This
article breaks down the various options: **_[Where do I put my
business logic in a React-Redux
application?](https://medium.com/@jeffbski/where-do-i-put-my-business-logic-in-a-react-redux-application-9253ef91ce1)_**
The article is an introduction (and motivation) for the development of
**_[redux-logic](https://github.com/jeffbski/redux-logic)_**
... *redux middleware for organizing all your business logic*.

I have been using
**[redux-logic](https://github.com/jeffbski/redux-logic)** since it's
begining and believe it is the **_best approach to encapsulate your
business logic_**. Prior to redux-logic, my business logic was spread
out in a variety of different places, including:

- component methods
- thunks
- and middleware injections

In addition, I relied heavily on batched actions, where logic entry
points would stimulate multiple actions in one procedural chunk of
code.  Needless to say, this was less than ideal. Even tools like
redux-dev-tools could not give me adequate insight into "what was
stimulating what"!

All of these techniques were replaced with "true" business logic,
organizing all my logic in one isolated spot, all orchestrated by
redux-logic!

My business logic is now:

- located in one logical discipline (i.e. dedicated "logic" modules)
- making it testable in isolation (very nice)!!
- has more concise and succinct goals
- promotes modular reuse
- provides traceable "cause and effects"
- is greatly simplified!
