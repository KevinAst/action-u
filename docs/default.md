## Defaulting Parameters

You may wish to provide default semantics to some of your action
creator parameters.  This too can be accomplished using the
`actionMeta.ratify` property (ratifyFn):

```js
import {generateActions} from 'action-u';

const actions = generateActions({
  userMsg: {
              actionMeta: {
                traits: ['msg'],
                ratify: (msg='Hello action-u') => [...arguments]
              },
    close: {
              actionMeta: {}
    }
  }
});
```

This is the reason the ratifyFn must return the arguments passed in
(to potentially inject the default semantics).

You can see that the `actionMeta.ratify` function is used for **both**
validation and default semantics.  Here is an example employing both:

```js
import {generateActions} from 'action-u';

const actions = generateActions({
  userMsg: {
              actionMeta: {
                traits: ['msg'],
                ratify(msg='Hello action-u')
                  assert(isString(msg), `ERROR: userMsg(msg) the supplied msg is NOT a string: ${msg}`);
                  return [...arguments];
                }
              },
    close: {
              actionMeta: {}
    }
  }
});
```
