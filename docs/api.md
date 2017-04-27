
<br/><br/><br/>

<a id="generateActions"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  generateActions()</h5>
document this!


<br/><br/><br/>

<a id="ActionReducerHash"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  ActionReducerHash : Object</h5>
A hash of reducer functions, indexed by the standard reduxaction.type.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| actionType1 | [`reducerFn`](#reducerFn) | The reducer function servicing: 'actionType1'. |
| actionType2 | [`reducerFn`](#reducerFn) | The reducer function servicing: 'actionType2'. |
| ...more | [`reducerFn`](#reducerFn) | ...etc. |


<br/><br/><br/>

<a id="reducerFn"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  reducerFn ⇒ \*</h5>
A standard [redux reducer function](http://redux.js.org/docs/basics/Reducers.html)that is responsible for state changes.


| Param | Type | Description |
| --- | --- | --- |
| state | \* | The current immutable state that is the reduction target. |
| action | [`Action`](#Action) | The standard redux action which drives the reduction process. |

**Returns**: \* - The resulting state after reduction.  

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


<br/><br/><br/>

<a id="InitialState"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  InitialState : \*</h5>
All astx-redux-util reducer creators, expose an `initialState`parameter which optionally provides a fall-back state value to useduring the state initialization boot-strap process.In general, redux expects your state to have concrete values(i.e. something other than `undefined`).  This means that thereduction entry point to each state element should define adefault.  Keeping this in mind, the `initialState` parameter isoptional, because some reducers are "by design" (when combined in acomposition) intended to be mid-stream processors (i.e. NOT thereduction entry point).

