## ActionStruct Shapes

The shape of the ActionStruct shape is ultimatly an app-specific
requirement.

We have a lot of flexibility in how we organize our ActionStruct.
For example, ActionNodes (i.e. action creators) can even contain
sub-structure.  As a result, we could define the two actions *(from
our prior example)* by **removing the `display` nomenclature**, making the
`userMsg` node an action creator, that in turn holds other structure:

 - `actions.userMsg(msg)`
 - `actions.userMsg.close()`

This is accomplished by simply **removing the `display` node**:

**Generation**:

```js
import {generateActions} from 'action-u';

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
```


**Usage**:

```js
const userMsg = actions.userMsg('Hello action-u');
      // userMsg yeilds the following action (which can be dispatched):
      //   {
      //     type: 'userMsg',
      //     msg:  'Hello action-u'
      //   }

const closeIt = actions.userMsg.close();
      // closeIt yeilds the following action (which can be dispatched):
      //   {
      //     type: 'userMsg.close'
      //   }

console.log(`First  type is '${actions.userMsg}'`);       // yields: First  type is 'userMsg'
console.log(`Second type is '${actions.userMsg.close}'`); // yields: Second type is 'userMsg.close'
```
