
<br/><br/><br/>

<a id="generateActions"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  generateActions(actionGenesis) ⇒ [`ActionStruct`](#ActionStruct)</h5>
A higher-order function that mirrors the supplied actionGenesisstructure, returning an ActionStruct, injecting machine-generatedaction creators that are decorated with their coresponding actiontypes.


| Param | Type | Description |
| --- | --- | --- |
| actionGenesis | [`ActionGenesis`](#ActionGenesis) | an "organizational" JSON structure that defines one or more action creators, with implicitly defined action types (gleaned from the structure itself). |

**Returns**: [`ActionStruct`](#ActionStruct) - an action structure (a mirror ofactionGenesis), with machine-generated action creators that aredecorated with their cooresponding action types.  

<br/><br/><br/>

<a id="ActionGenesis"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  ActionGenesis : JSON</h5>
??? A hash of reducer functions, indexed by the standard reduxaction.type.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| actionType1 | reducerFn | The reducer function servicing: 'actionType1'. |
| actionType2 | reducerFn | The reducer function servicing: 'actionType2'. |
| ...more | reducerFn | ...etc. |


<br/><br/><br/>

<a id="ActionStruct"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  ActionStruct : JSON</h5>
??? A hash of reducer functions, indexed by the standard reduxaction.type.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| actionType1 | reducerFn | The reducer function servicing: 'actionType1'. |
| actionType2 | reducerFn | The reducer function servicing: 'actionType2'. |
| ...more | reducerFn | ...etc. |


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

