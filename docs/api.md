
<br/><br/><br/>

<a id="generateActions"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  generateActions(actionGenesis) ⇒ [`ActionStruct`](#ActionStruct)</h5>
A higher-order function that mirrors the supplied


| Param | Type | Description |
| --- | --- | --- |
| actionGenesis | [`ActionGenesis`](#ActionGenesis) | an "organizational" JSON structure that defines one or more action creators, with implicitly defined action types (gleaned from the structure itself). |

**Returns**: [`ActionStruct`](#ActionStruct) - an action structure (a mirror of

<br/><br/><br/>

<a id="generateActions_root"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  generateActions.root(actionGenesis) ⇒ [`ActionStruct`](#ActionStruct)</h5>
The `generateActions.root()` function is identical to


| Param | Type | Description |
| --- | --- | --- |
| actionGenesis | [`ActionGenesis`](#ActionGenesis) | an "organizational" JSON structure that defines one or more action creators, with implicitly defined action types (gleaned from the structure itself).  For `generateActions.root()`, this is **expected** to contain a single root node (which will be returned). |

**Returns**: [`ActionStruct`](#ActionStruct) - **the root** action structure (a mirror of

<br/><br/><br/>

<a id="ratifyFn"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  ratifyFn(...args) ⇒ args</h5>
An optional hook of {{book.api.ActionMeta}} to validate and/or default


| Param | Type | Description |
| --- | --- | --- |
| ...args | \* | the parameters to this function should match that of the action creator it is defining |

**Returns**: args - an array of the arguments passed in (potentially defaulted)  

<br/><br/><br/>

<a id="ActionNode"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  ActionNode(...args) ⇒ [`Action`](#Action)</h5>
ActionNode is a generated action creator function that lives as a


| Param | Type | Description |
| --- | --- | --- |
| ...args | \* | the parameters are app-specific to this action type. |

**Returns**: [`Action`](#Action) - a standard redux Action, specific to this action

<br/><br/><br/>

<a id="ActionGenesis"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  ActionGenesis : JSON</h5>
ActionGenesis is a JSON meta structure (used by

**Example** *(showing a standard set of fetch/complete/fail actions)*  
```js
{
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
}
```

<br/><br/><br/>

<a id="ActionMeta"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  ActionMeta : JSON</h5>
An ActionMeta is a sub-node (named `actionMeta`) in the

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| traits | Array.&lt;string&gt; | An array of names that serve BOTH as the: <li>expected parameter names of the action creator</li> <li>and the Action property names (returned from the action creator)</li> When NO `traits` property is supplied, the Action merely has NO properties *(other than it's `type` [of course])*. |
| ratify | [`ratifyFn`](#ratifyFn) | An optional hook to validate and/or default action creator parameters.<br/> When NO `ratify` function is supplied, only simple validation is performed *(ex: the number of arguments supplied)*. |


<br/><br/><br/>

<a id="ActionStruct"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  ActionStruct : JSON</h5>
ActionStruct is a JSON stucture which is a key aspect of action-u.

**Example** *(showing a standard set of fetch/complete/fail actions)*  
```js
{
  widget: {
    fetch(selCrit): {      // action creator (impl omitted) - type promoted via string coercion of funct
      complete(widget): {} // action creator (impl omitted) - type promoted via string coercion of funct
      fail(err): {}        // action creator (impl omitted) - type promoted via string coercion of funct
    }
  }
}
```

<br/><br/><br/>

<a id="Action"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  Action : Object</h5>
A standard [redux Action object](http://redux.js.org/docs/basics/Actions.html)

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | string | The action type. |
| whatever | \* | Additional app-specific payload (as needed). |
