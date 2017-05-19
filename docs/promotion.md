# Action Promotion

This section discusses the various options available in maintaining
and promoting actions within your application.

For sake of example, lets say we have two sets of inner-related
actions.  *Obviously a real application will have more, but this is
enough to illustrate the various promotion techniques.*





## Single Module

It is not uncommon to maintain a single JavaScript module to promote
all actions of an application.  This is actually feasible, due to the
concise definitions made possible by action-u *(at least in small
apps)*.

**Generation**:

- **actions.js**

  ```js
  import {generateActions} from 'action-u';

  export default generateActions({
    userMsg: {
      display: {
                    actionMeta: {
                      traits: ['msg']
                    }
      },
      close: {
                    actionMeta: {}
      }
    },
    widget: {
      fetch: {
                    actionMeta: {
                      traits: ['selCrit']
                    },
        complete: {
                    actionMeta: {
                      traits: ['widget']
                    }
        },
        fail: {
                    actionMeta: {
                      traits: ['err']
                    }
        }
      }
    }
  });
  ```

**Usage:**

In this scenario, we merely import/use one central actions object, which
holds all our actions.

- **foo.js**

  ```js
  import actions from './actions';

  ...

  dispatch( actions.userMsg.display('Hello action-u') );
  ```





## Multiple Modules

This technique breaks up our actions into separate modules (typically
within an `actions/` directory).

**Generation**:

Notice that we use the {{book.api.generateActionsDOTroot}} function,
which promotes the single root node of the ActionStruct, rather than
the entire structure.

- **actions/userMsg.js**

  ```js
  import {generateActions} from 'action-u';

  export default generateActions.root({
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

- **actions/widget.js**

  ```js
  import {generateActions} from 'action-u';

  export default generateActions.root({
    widget: {
      fetch: {
                    actionMeta: {
                      traits: ['selCrit']
                    },
        complete: {
                    actionMeta: {
                      traits: ['widget']
                    }
        },
        fail: {
                    actionMeta: {
                      traits: ['err']
                    }
        }
      }
    }
  });
  ```

**Usage:**

In this scenario, we import/use the specific action module of interest.

- **foo.js**

  ```js
  import userMsg from './actions/userMsg';

  ...

  dispatch( userMsg.display('Hello action-u') );
  ```





## Hybrid

This strategy combines the best of both worlds.  It is a hybrid
technique where we maintain inner-related actions within their own
separate modules, but promote them via a single central module.  In
essence it is a **Multiple Modules - Single Import** tactic.

This is the **preferred approach** for most projects.

**Generation**:

- **actions/userMsg.js** ... same as above
- **actions/widget.js** ... same as above
- **actions/index.js**

  ```js
  import userMsg from './userMsg';
  import widget  from './widget;

  export default {
    userMsg,
    widget
  };
  ```


**Usage:**

Using this technique, we may choose to import either a specific
action, or the combined actions.

- **foo1.js** *(combined actions)*

  ```js
  import actions from './actions';

  ...

  dispatch( actions.userMsg.display('Hello action-u') );
  ```

- **foo2.js** *(specific action)*

  ```js
  import userMsg from './actions/userMsg';

  ...

  dispatch( userMsg.display('Hello action-u') );
  ```
