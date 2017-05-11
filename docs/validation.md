## Parameter Validation

One of the advantages of auto-generating our action creators is that
we can automatically provide some limited validation.  

By default all action creator invocations will insure the correct
number of parameters are provided.  As an example, if you invoke the
`actions.userMsg(msg)` without the msg parameter, the following
exception will be thrown:

  ```
  ERROR: Action Creator userMsg(msg) expecting 1 parameter, but received 0
  ```

You can provide app-specific parameter validation by using the
`actionMeta.ratify` property.  This is an app-supplied function
(ratifyFn) that accepts the same set of parameters defined in
`actionMeta.traits`, and performs validation via an app-specific
means (typically thrown exceptions), returning an array of the
arguments passed in.

As an example, to insure only strings are passed into
`actions.userMsg(msg)`, do the following:

```js
import {generateActions} from 'action-u';

const actions = generateActions({
  userMsg: {
              actionMeta: {
                traits: ['msg'],
                ratify(msg) { // NEW
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
