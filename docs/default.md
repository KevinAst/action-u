## Defaulting Parameters

You may wish to provide default semantics to some of your action
creator parameters.  This too can be accomplished using the
{{book.api.actionMetaDOTratify}} property ({{book.api.ratifyFn}}):

```js
import {generateActions} from 'action-u';

const actions = generateActions({
  userMsg: {
              actionMeta: {
                traits: ['msg'],
                ratify: (msg='Hello action-u') => [msg]
              },
    close: {
              actionMeta: {}
    }
  }
});
```

**NOTE**: This is the reason {{book.api.ratifyFn}} must return
the arguments passed in: *to allow it to inject default semantics*.
You should **never** attempt to return the built-in `arguments`
array-like object for two reasons:
1. applied defaults are NOT reflected in `arguments`, and
2. `arguments` are not bound to arrow functions.

As you can see, the {{book.api.actionMetaDOTratify}} function is used
for **both** validation and default semantics.  Here is an example
employing both:

```js
import {generateActions} from 'action-u';

const actions = generateActions({
  userMsg: {
              actionMeta: {
                traits: ['msg'],
                ratify(msg='Hello action-u')
                  assert(isString(msg), `ERROR: userMsg(msg) the supplied msg is NOT a string: ${msg}`);
                  return [msg];
                }
              },
    close: {
              actionMeta: {}
    }
  }
});
```
