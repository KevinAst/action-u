
<br/><br/><br/>

<a id="generateActions"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  generateActions(actionGenesis) ⇒ [`ActionStruct`](#ActionStruct)</h5>
A higher-order function that mirrors the supplied actionGenesisstructure, returning an ActionStruct, injecting machine-generatedaction creators that are decorated with their coresponding actiontypes.?? test link: [root](#generateActions.root)


| Param | Type | Description |
| --- | --- | --- |
| actionGenesis | [`ActionGenesis`](#ActionGenesis) | an "organizational" JSON structure that defines one or more action creators, with implicitly defined action types (gleaned from the structure itself). |

**Returns**: [`ActionStruct`](#ActionStruct) - an action structure (a mirror ofactionGenesis), with machine-generated action creators that aredecorated with their cooresponding action types.  

<br/><br/><br/>

<a id="generateActions_root"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  generateActions.root(actionGenesis) ⇒ [`ActionStruct`](#ActionStruct)</h5>
??? A higher-order function that mirrors the supplied actionGenesisstructure, returning an ActionStruct, injecting machine-generatedaction creators that are decorated with their coresponding actiontypes.?? test link: [generateActions](#generateActions)


| Param | Type | Description |
| --- | --- | --- |
| actionGenesis | [`ActionGenesis`](#ActionGenesis) | an "organizational" JSON structure that defines one or more action creators, with implicitly defined action types (gleaned from the structure itself). |

**Returns**: [`ActionStruct`](#ActionStruct) - ??? an action structure (a mirror ofactionGenesis), with machine-generated action creators that aredecorated with their cooresponding action types.  

<br/><br/><br/>

<a id="ratifyFn"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  ratifyFn(...args) ⇒ args</h5>
An optional hook of [ActionMeta](#ActionMeta) to validate and/or defaultaction creator parameters.- validation is accomplished by app-specific means (typically  thrown exceptions)- default parameters are accomplished by applying default semantics  and returning the arguments


| Param | Type | Description |
| --- | --- | --- |
| ...args | \* | the parameters to this function should match that of the action creator it is defining |

**Returns**: args - an array of the arguments passed in (potentially defaulted)  

<br/><br/><br/>

<a id="ActionNode"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  ActionNode(...args) ⇒ [`Action`](#Action)</h5>
ActionNode is a machine-generated action creator function thatlives as a JSON node in the ActionStruct.The ActionNode promotes it's action type through a string coercionof the action creator function itself (i.e. the function'stoString() has been overloaded).


| Param | Type | Description |
| --- | --- | --- |
| ...args | \* | the parameters are app-specific to this action type. |

**Returns**: [`Action`](#Action) - a standard redux Action, specific to this actiontype.  

<br/><br/><br/>

<a id="ActionGenesis"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  ActionGenesis : JSON</h5>
ActionGenesis is a JSON meta structure (used by [generateActions](#generateActions))that provides the master definition for the machine-generated[ActionStruct](#ActionStruct), promoting one or more action creators and types.- The structure is app-specific and can employ depth to highlight  inner-relationships between various action creators.- Ultimately the structure defines one or more action creator  function nodes.  Each of these nodes promote:  * the action creator function itself, and  * the action type, which is implicitly gleaned from the containing JSON    structure node accumulation (ex: `'widget.fetch'`)- Nodes containing an `actionMeta` property define an ActionNode  (i.e. an action creator).  * The resultant corresponding node will be an action creator    function.  The characteristics of this function is further    defined by `actionMeta` sub-properties (see [ActionMeta](#ActionMeta)).  * The action type is implied from the containing JSON structure    node accumulation (ex: `'widget.fetch.complete'`) and is promoted through    a string coercion of the action creator function itself    (i.e. the function's toString() has been overloaded).- All other nodes are merely intermediate nodes that organize  (i.e. add meaning) to the overall shape of the promoted actions.  In the example below, `widget` is an intermediate node (i.e. it  is not an action creator).- Note that even ActionNodes may in turn contain sub-structure  (i.e. subordinate actions).  In the example below,  `widget.fetch(selCrit)` is an action creator, an yet contains  subordinate actions: `widget.fetch.complete(widget)`.

**Example** *(showing a standard set of fetch/complete/fail actions)*  
```js
{
  widget: {
    fetch: {      actionMeta: {
                    traits: ['selCrit']
                  },
      complete: { actionMeta: {
                    traits: ['widget']
                  }
      },
      fail: {     actionMeta: {
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
An ActionMeta is a sub-node (named `actionMeta`) in theActionGenesis that identifies it's parent as being an ActionNode(i.e. an action creator).Supported properties of ActionMeta are:

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| traits | Array.&lt;string&gt; | An array of names that serve BOTH as the: <li>expected parameter names of the action creator</li> <li>and the Action property names (returned from the action creator)</li> When NO `traits` property is supplied, the Action merely has NO properties *(other than it's `type` [of course])*. |
| ratify | [`ratifyFn`](#ratifyFn) | An optional hook to validate and/or default action creator parameters.<br/> When NO `ratify` function is supplied, only simple validation is performed *(ex: the number of arguments supplied)*. |


<br/><br/><br/>

<a id="ActionStruct"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  ActionStruct : JSON</h5>
ActionStruct is a JSON stucture which is a key aspect of action-u.It:- implicitly defines your action types, - instinctively groups related actions,- and seamlessly promotes both action creators and types throughout  your application.ActionStruct is a machine-generated JSON run-time structure (outputfrom [generateActions](#generateActions)) that promotes a series of actioncreators and types in an app-specific structure (mirroring the shapeof the ActionGenesis).- The structure is app-specific and can employ depth to highlight  inner-relationships between various action creators.- The structure defines one or more ActionNodes (i.e. action  creator functions).  Each ActionNode encapsolates BOTH the action  creator and it's type.  * The action creator function (the node itself) accepts the    desired parameters and returns a newly created action.  * The action type is implied from the containing JSON structure    node accumulation (ex: `'widget.fetch.complete'`) and is    promoted through a string coercion of the action creator    function itself (i.e. the function's toString() has been    overloaded).- All other nodes are merely intermediate nodes that organize  (i.e. add meaning) to the overall shape of the promoted actions.  In the example below, `widget` is an intermediate node (i.e. it  is not an action creator).- Note that even ActionNodes may in turn contain sub-structure  (i.e. subordinate actions).  In the example below,  `widget.fetch(selCrit)` is an action creator, an yet contains  subordinate actions: `widget.fetch.complete(widget)`.

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
A standard [redux Action object](http://redux.js.org/docs/basics/Actions.html)that drives the reduction process.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | string | The action type. |
| whatever | \* | Additional app-specific payload (as needed). |

