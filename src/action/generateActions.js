import isFunction    from 'lodash.isfunction';
import isPlainObject from 'lodash.isplainobject';
import verify        from '../util/verify';

/**
 * A higher-order function that mirrors the supplied
 * {{book.api.actionGenesis}} structure, returning an
 * {{book.api.ActionStruct}}, injecting generated action creators that
 * are decorated with their coresponding action types.
 * 
 * {{book.guide.formalTypes}} diagrams this process.  Examples can be
 * found throughout the {{book.guide.devGuide}}, starting with
 * {{book.guide.basics}}.
 * 
 * @param {ActionGenesis} actionGenesis - an "organizational" JSON
 * structure that defines one or more action creators, with implicitly
 * defined action types (gleaned from the structure itself).
 * 
 * @returns {ActionStruct} an action structure (a mirror of
 * {{book.api.actionGenesis}}), with generated action creators that
 * are decorated with their cooresponding action types.
 */
export default function generateActions(actionGenesis) {
  // validate actionGenesis
  const check = verify.prefix('ActionU.generateActions() parameter violation: ');
  check(actionGenesis,                'actionGenesis argument is required');
  check(isPlainObject(actionGenesis), 'actionGenesis argument is NOT an object literal');
  check(!actionGenesis.actionMeta,    "actionGenesis argument CANNOT have an actionMeta property in the root (i.e. the root cannot be an ActionNode, because it is unnamed)");

  // morph the supplied actionGenesis into an ActionStruct
  return morph2Runtime(actionGenesis, '');
}

/**
 * The `generateActions.root()` function is identical to
 * {{book.api.generateActions}}, except it returns the single root
 * node of the {{book.api.ActionStruct}}, rather than the entire
 * structure.  *This is useful for projects that organize their
 * actions in seperate JavaScript modules (see
 * {{book.guide.promotion}})*.
 * 
 * @param {ActionGenesis} actionGenesis - an "organizational" JSON
 * structure that defines one or more action creators, with implicitly
 * defined action types (gleaned from the structure itself).  For
 * `generateActions.root()`, this is **expected** to contain a single
 * root node (which will be returned).
 * 
 * @returns {ActionStruct} **the root** action structure (a mirror of
 * {{book.api.actionGenesis}}), with generated action creators that
 * are decorated with their cooresponding action types.
 */
generateActions.root = function(actionGenesis) {

  // pass-through to generateActions()
  const actionStruct  = generateActions(actionGenesis);

  // validae only one root node
  const rootNodeNames = Object.keys(actionGenesis); // ... use actionGenesis so as NOT to get the injected 'toString' of actionStruct
  const check         = verify.prefix('ActionU.generateActions.root() parameter violation: ');
  check(rootNodeNames.length === 1, `actionGenesis argument may ONLY contain a single root node (what will be returned) ... ${rootNodeNames}`);

  // expose the ActionStruct root
  return actionStruct[rootNodeNames[0]];
};



//***
//*** Internals ...
//***

const knownMetaProps = ['traits', 'ratify', 'thunk'];


/**
 * Our default ActionMeta.ratify() function ... simply no-op.
 * @private
 */
function ratifyDefault(...args) {
  return args;
}

/**
 * Morph the supplied genesisNode into a runtime node ... part of the
 * ActionStruct.
 * 
 * @param {JSON-node} genesisNode - a node within the ActionGenisis
 * structure to be "morphed".
 * 
 * @param {string} actionType - the accumulative action type
 * representing this genesisNode (within the overal ActionGenesis).
 * 
 * @returns {JSON-node} a "morphed" run-time node representation of
 * the supplied genesisNode.
 * 
 * @private
 */
function morph2Runtime(genesisNode, actionType) {

  // validate genesisNode
  const check = verify.prefix(`ActionU.generateActions() actionGenesis node ${actionType}`);
  check(isPlainObject(genesisNode), ' must be an object literal');
  check(Object.keys(genesisNode).length > 0, ' must contain at least ONE sub-node (either an app-specific or an actionMeta node)');

  // define our actionMeta (if any)
  const actionMeta = genesisNode.actionMeta;

  // morph the genesisNode into a runtimeNode (of the ActionStruct)
  let runtimeNode = null;
  if (actionMeta) { // *** node is an action creator (i.e. an ActionNode)

    // insure actionMeta is an object literal
    check(isPlainObject(actionMeta), '.actionMeta is NOT an object literal');

    // insure all actionMeta properties are known
    const metaProps = Object.keys(actionMeta);
    const unknownMetaProps = metaProps.filter( (prop) => knownMetaProps.indexOf(prop) < 0 );
    check(unknownMetaProps.length === 0, `.actionMeta contains unrecognized properties: ${unknownMetaProps}`);

    // thunk definition
    if (actionMeta.thunk) {
      // insure actionMeta.thunk is a function
      check(isFunction(actionMeta.thunk), `.actionMeta.thunk is NOT a function ... ${actionMeta.thunk}`);
      // insure no other actionMeta properties are provided
      check(metaProps.length ===1, `.actionMeta.thunk is NOT allowed with any other actionMeta property (found following properties: ${metaProps})`);

      // thunks are simply injected directly in our ActionStruct (as is)
      runtimeNode = actionMeta.thunk;
    }

    // action creator generation (i.e. NON thunk)
    else {

      // insure actionMeta.traits (if supplied) is a string[]
      const traits = actionMeta.traits || [];
      check(Array.isArray(traits), '.actionMeta.traits is NOT a string[]'); // consider also lodash.isString() on each elm
      
      // insure actionMeta.ratify (if supplied) is a function
      const ratify = actionMeta.ratify || ratifyDefault;
      check(isFunction(ratify), `.actionMeta.ratify is NOT a function ... ${ratify}`);
      
      // ***
      // *** THIS IS IT ... here is a generated action creator (i.e. an ActionNode)
      // ***
      runtimeNode = (...args) => {
      
        // apply app-specific action creator parameter validation/defaults
        args = ratify(...args);
      
        // apply standard validation (insuring correct number of arguments passed in)
        if (traits.length !== args.length) {
          // ex: ERROR: action-u action creator: userMsg.display(msg) expecting 1 parameters, but received 0.
          throw new TypeError(`ERROR: action-u action creator: ${actionType}(${traits.toString()}) expecting ${traits.length} parameters, but received ${args.length}.`);
        }
      
        // build/return our action object
        const action = { type: actionType }; // baseline action with it's type
        for (let i=0; i<args.length; i++) {  // inject the arguments into our action
          action[traits[i]] = args[i];
        }
        return action;
      };
    }

    // overload toString() to promote our action type
    runtimeNode.toString = () => actionType;
  }

  else { // *** node is an app-specific node (who's sub-structure will contain ActionNodes)
    // this is an app-specific node (who's sub-structure will contain ActionNodes)
    runtimeNode = {};

    // overload toString() to ERROR (it is NOT an action type)
    // ex: ERROR: action-u ActionStruct: 'userMsg' is NOT an action type, RATHER an app-specific node.
    runtimeNode.toString = () => { throw new TypeError(`ERROR: action-u ActionStruct: '${actionType}' is NOT an action type (rather an app-specific node).`); };
  }

  // recurse further into the sub-structure
  for (const subNodeName in genesisNode) {
    if (subNodeName !== 'actionMeta') { // do NOT process actionMeta nodes - they are NOT app-specific
                                        // ... internal use only (processed by parent node)
      const subNode = genesisNode[subNodeName];
      const delim   = actionType ? '.' : '';
      const subType = `${actionType}${delim}${subNodeName}`;
      
      // morph nested sub-structure
      runtimeNode[subNodeName] = isPlainObject(subNode) 
                                   ? morph2Runtime(subNode, subType)
                                   : subNode; // support app-specific data in struct (just copy as is)
                                              // ... currently undocumented (because I'm not sure it is needed)
    }
  }

  // that's all folks :-)
  return runtimeNode;
}




//***
//*** Specifications (JSDoc tags only)
//***

/**
 * @typedef {JSON} ActionGenesis
 * 
 * ActionGenesis is a JSON meta structure (used by
 * {{book.api.generateActions}}) that provides the master definition
 * for the generated {{book.api.ActionStruct}}, promoting one or more
 * action creators and types.
 *
 * {{book.guide.formalTypes}} diagrams the action-u formal types.
 * 
 * - The structure is app-specific and can employ depth to highlight
 *   inner-relationships between various action creators.
 * 
 * - Ultimately the structure defines one or more action creator
 *   function nodes.  Each of these nodes promote:
 * 
 *   * the action creator function itself, and
 * 
 *   * the action type, which is implicitly gleaned from the containing JSON
 *     structure node accumulation (ex: `'widget.fetch'`)
 * 
 * - Nodes containing an {{book.api.actionMeta}} property define an
 *   {{book.api.ActionNode}} (i.e. an action creator).
 * 
 *   * The resultant corresponding node will be an action creator
 *     function.  The characteristics of this function is further
 *     defined by {{book.api.actionMeta}} sub-properties (see
 *     {{book.api.ActionMeta}}).
 * 
 *   * The action type is implied from the containing JSON structure
 *     node accumulation (ex: `'widget.fetch.complete'`) and is
 *     promoted through a string coercion of the action creator
 *     function itself (i.e. the function's toString() has been
 *     overloaded).
 * 
 * - All other nodes are merely intermediate nodes that organize
 *   (i.e. add meaning) to the overall shape of the promoted actions.
 *   In the example below, `widget` is an intermediate node (i.e. it
 *   is not an action creator).
 * 
 * - Note that even {{book.api.ActionNodes}} may in turn contain
 *   sub-structure (i.e. subordinate actions).  In the example below,
 *   `widget.fetch(selCrit)` is an action creator, an yet contains
 *   subordinate actions: `widget.fetch.complete(widget)`.
 * 
 * @example <caption>showing a standard set of fetch/complete/fail actions</caption>
 * {
 *   widget: {
 *     fetch: {
 *                   actionMeta: {
 *                     traits: ['selCrit']
 *                   },
 *       complete: {
 *                   actionMeta: {
 *                     traits: ['widget']
 *                   }
 *       },
 *       fail: {
 *                   actionMeta: {
 *                     traits: ['err']
 *                   }
 *       }
 *     }
 *   }
 * }
 */


/**
 * @typedef {JSON} ActionMeta
 * 
 * An ActionMeta is a sub-node (named `actionMeta`) in the
 * {{book.api.ActionGenesis}} that identifies it's parent as being an
 * {{book.api.ActionNode}} (i.e. an action creator).
 *
 * {{book.guide.formalTypes}} diagrams the action-u formal types.
 *
 * Supported properties of ActionMeta are:
 *
 * @property {string[]} traits - An array of names that serve BOTH as the:
 * <ul>
 * <li>expected parameter names of the action creator</li>
 * <li>and the Action property names (returned from the action creator)</li>
 * When NO `traits` property is supplied, the Action merely has NO properties
 * (other than it's `type` [of course]).
 * </ul>
 * Please refer to the {{book.guide.basics}} discussion for complete examples.
 *
 * @property {ratifyFn} ratify - An optional hook to validate and/or
 * default action creator parameters.<br/> 
 * When NO `ratify` function is supplied, only simple validation is
 * performed *(ex: the number of arguments supplied)*.  Please refer
 * to {{book.guide.validation}} and {{book.guide.default}} for
 * complete examples.
 *
 * @property {function} thunk - An action creator function that
 * promotes a thunk.  When `thunk` is used, no other ActionMeta
 * properties are allowed.  Please refer to {{book.guide.thunks}} for
 * a complete description.
 */


/**
 * @function ratifyFn
 *
 * @description
 * An optional hook of {{book.api.ActionMeta}} to validate and/or default
 * action creator parameters.
 *
 * - validation is accomplished by app-specific means (typically
 *   thrown exceptions)
 *
 * - default parameters are accomplished by applying default semantics
 *   and returning the arguments
 * 
 * Please refer to {{book.guide.validation}} and
 * {{book.guide.default}} for complete examples.
 *
 * @param {...*} args - the parameters to this function should match
 * that of the action creator it is defining
 * 
 * @returns {args} an array of the arguments passed in (potentially
 * defaulted).  **NOTE**: You should never attempt to return the
 * built-in `arguments` array-like object for two reasons: **1.**
 * applied defaults are NOT reflected in `arguments`, and **2.**
 * `arguments` are not bound to arrow functions.
 */


/**
 * @typedef {JSON} ActionStruct
 * 
 * ActionStruct is a JSON stucture which is a key aspect of action-u.
 * It:
 * - implicitly defines your action types, 
 * - instinctively groups related actions,
 * - and seamlessly promotes both action creators and types throughout
 *   your application.
 * 
 * ActionStruct is a generated JSON run-time structure (output from
 * {{book.api.generateActions}}) that promotes a series of action
 * creators and types in an app-specific structure (mirroring the
 * shape of the {{book.api.ActionGenesis}}).
 *
 * {{book.guide.formalTypes}} diagrams the action-u formal types.
 * 
 * - The structure is app-specific and can employ depth to highlight
 *   inner-relationships between various action creators.
 * 
 * - The structure defines one or more {{book.api.ActionNodes}}
 *   (i.e. action creator functions).  Each {{book.api.ActionNode}}
 *   encapsolates BOTH the action creator and it's type.
 * 
 *   * The action creator function (the node itself) accepts the
 *     desired parameters and returns a newly created action.
 * 
 *   * The action type is implied from the containing JSON structure
 *     node accumulation (ex: `'widget.fetch.complete'`) and is
 *     promoted through a string coercion of the action creator
 *     function itself (i.e. the function's toString() has been
 *     overloaded).
 * 
 * - All other nodes are merely intermediate nodes that organize
 *   (i.e. add meaning) to the overall shape of the promoted actions.
 *   In the example below, `widget` is an intermediate node (i.e. it
 *   is not an action creator).
 * 
 * - Note that even {{book.api.ActionNodes}} may in turn contain sub-structure
 *   (i.e. subordinate actions).  In the example below,
 *   `widget.fetch(selCrit)` is an action creator, an yet contains
 *   subordinate actions: `widget.fetch.complete(widget)`.
 * 
 * @example <caption>showing a standard set of fetch/complete/fail actions</caption>
 * {
 *   widget: {
 *     fetch(selCrit): {      // action creator (impl omitted) - type promoted via string coercion of funct
 *       complete(widget): {} // action creator (impl omitted) - type promoted via string coercion of funct
 *       fail(err): {}        // action creator (impl omitted) - type promoted via string coercion of funct
 *     }
 *   }
 * }
 */


/**
 * @function ActionNode
 *
 * @description
 * ActionNode is a generated action creator function that lives as a
 * JSON node in the {{book.api.ActionStruct}}.
 * 
 * The ActionNode promotes it's action type through a string coercion
 * of the action creator function itself (i.e. the function's
 * toString() has been overloaded).
 *
 * {{book.guide.formalTypes}} diagrams the action-u formal types.
 * 
 * @param {...*} args - the parameters are app-specific to this action
 * type.
 * 
 * @returns {Action} a standard redux Action, specific to this action
 * type.
 */
