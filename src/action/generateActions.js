// ? import identity    from 'lodash.identity';
// ? import isFunction  from 'lodash.isfunction';
// ? import verify      from '../util/verify';

/**
 * A higher-order function that mirrors the supplied actionGenesis
 * structure, returning an ActionStruct, injecting machine-generated
 * action creators that are decorated with their coresponding action
 * types.
 * 
 * @param {ActionGenesis} actionGenesis - an "organizational" JSON
 * structure that defines one or more action creators, with implicitly
 * defined action types (gleaned from the structure itself).
 * 
 * @returns {ActionStruct} an action structure (a mirror of
 * actionGenesis), with machine-generated action creators that are
 * decorated with their cooresponding action types.
 */
export default function generateActions() {
  // ? testToString(); // ?? temp
  return 123;
}

// ? function testToString() { // ?? temp
// ?   const actionCreator = () => ({type: 'myType'});
// ?   actionCreator.toString = () => 'myType';
// ? 
// ?   console.log(`actionCreator(): `, actionCreator());
// ?   console.log(`actionCreator: '${actionCreator}'`);
// ? 
// ?   const myHash = {
// ?     [actionCreator]: 'WowZee'
// ?   };
// ?   console.log(`myHash: `, myHash);
// ? 
// ?   const myHash2 = {
// ?   };
// ?   myHash2[actionCreator] = 'WooWoo';
// ?   console.log(`myHash2: `, myHash2);
// ?   
// ?   switch ('myType') {
// ? 
// ?     case String(actionCreator):
// ?       console.log(`switch test REQURES string coercion`);
// ?       break;
// ? 
// ?     default:
// ?       console.log(`switch test FAILED :-(`);
// ?   }
// ? 
// ?   console.log(`String(null)==='null': ${String(null)==='null'}`);
// ?   console.log(`String(undefined)==='undefined': ${String(undefined)==='undefined'}`);
// ? 
// ? }


//***
//*** Specifications (JSDoc tags only)
//***

/**
 * @typedef {JSON} ActionGenesis
 *
 * ??? A hash of reducer functions, indexed by the standard redux
 * action.type.
 *
 * @property {reducerFn} actionType1 - The reducer function servicing: 'actionType1'.
 * @property {reducerFn} actionType2 - The reducer function servicing: 'actionType2'.
 * @property {reducerFn} ...more - ...etc.
 */

/**
 * @typedef {JSON} ActionStruct
 *
 * ??? A hash of reducer functions, indexed by the standard redux
 * action.type.
 *
 * @property {reducerFn} actionType1 - The reducer function servicing: 'actionType1'.
 * @property {reducerFn} actionType2 - The reducer function servicing: 'actionType2'.
 * @property {reducerFn} ...more - ...etc.
 */
