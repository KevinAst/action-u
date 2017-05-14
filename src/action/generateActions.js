/**
 * A higher-order function that mirrors the supplied
 * {{book.api.actionGenesis}} structure, returning an
 * {{book.api.ActionStruct}}, injecting generated action creators that
 * are decorated with their coresponding action types.
 * 
 * The {{book.guide.formalTypes}} section has a diagram that sheds
 * light on this process.
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
  return 123;
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
  return 123;
};




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
 * Supported properties of ActionMeta are:
 *
 * @property {string[]} traits - An array of names that serve BOTH as
 * the:
 * <li>expected parameter names of the action creator</li>
 * <li>and the Action property names (returned from the action creator)</li>
 * When NO `traits` property is supplied, the Action merely has NO properties
 * *(other than it's `type` [of course])*.
 *
 * @property {ratifyFn} ratify - An optional hook to validate and/or
 * default action creator parameters.<br/>
 * When NO `ratify` function is supplied, only simple validation is
 * performed *(ex: the number of arguments supplied)*.
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
 * @param {...*} args - the parameters to this function should match
 * that of the action creator it is defining
 * 
 * @returns {args} an array of the arguments passed in (potentially defaulted)
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
 * @param {...*} args - the parameters are app-specific to this action
 * type.
 * 
 * @returns {Action} a standard redux Action, specific to this action
 * type.
 */
