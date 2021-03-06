import expect              from 'expect';
import { generateActions } from '../../../tooling/ModuleUnderTest';

describe('generateActions() tests', () => {

  //****************************************************************************
  describe('basic tests', () => {

    const curDate = new Date();

    const actions = generateActions({
      userMsg: {
        display: {
                   actionMeta: {
                     traits: ['msg']
                   }
        },

        appData1: 123,                // undocumented app-specific data in structure
        appData2: 'this is app data', // ditto
        appData3: curDate,            // ditto

        close: {
                   actionMeta: {}
        }
      }
    });

    it('userMsg.display() action creator', () => {
      expect(actions.userMsg.display('Hello action-u')).toEqual({
        type: 'userMsg.display',
        msg:  'Hello action-u',
      });
    });

    it('userMsg.display type coercion', () => {
      expect(String(actions.userMsg.display)).toEqual('userMsg.display');
    });

    it('userMsg.close() action creator', () => {
      expect(actions.userMsg.close()).toEqual({
        type: 'userMsg.close',
      });
    });

    it('userMsg.close type coercion via string concatenation', () => {
      expect(''+actions.userMsg.close).toEqual('userMsg.close');
    });

    it('userMsg.display() basic parameter validation - expecting exception', () => {
      // Error: ERROR: action-u action creator: userMsg.display(msg) expecting 1 parameters, but received 2.
      expect(()=>actions.userMsg.display('msg', 'unexpected parameter')).toThrow('userMsg.display(msg) expecting 1 parameters, but received 2');
    });

    it('userMsg is NOT an action type - expecting exception', () => {
      // Error: TypeError: ERROR: action-u ActionStruct: 'userMsg' is NOT an action type, RATHER an app-level node.
      expect(()=>String(actions.userMsg)).toThrow('is NOT an action type');
    });


    // test app-specific data in structure
    // ... currently undocumented because I'm not sure it is needed

    it('userMsg.appData1 (undocumented app-specific data test)', () => {
      expect(actions.userMsg.appData1).toBe(123);
    });

    it('userMsg.appData2 (undocumented app-specific data test)', () => {
      expect(actions.userMsg.appData2).toBe('this is app data');
    });

    it('userMsg.appData3 (undocumented app-specific data test)', () => {
      expect(actions.userMsg.appData3).toBe(curDate);
    });

  });


  //****************************************************************************
  describe('action creators WITH depth', () => {

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

    it('userMsg() action creator', () => {
      expect(actions.userMsg('Hello action-u')).toEqual({
        type: 'userMsg',
        msg:  'Hello action-u',
      });
    });

    it('userMsg type coercion', () => {
      expect(String(actions.userMsg)).toEqual('userMsg');
    });

    it('userMsg.close() action creator', () => {
      expect(actions.userMsg.close()).toEqual({
        type: 'userMsg.close',
      });
    });

    it('userMsg.close type coercion via string concatenation', () => {
      expect(''+actions.userMsg.close).toEqual('userMsg.close');
    });

    it('userMsg.close() basic parameter validation - expecting exception', () => {
      // Error: ERROR: action-u action creator: userMsg.close() expecting 0 parameters, but received 1.
      expect(()=>actions.userMsg.close('unexpected parameter')).toThrow('userMsg.close() expecting 0 parameters, but received 1');
    });

  });


  //****************************************************************************
  describe('test generateActions.root()', () => {

    const userMsg = generateActions.root({
      userMsg: {
        actionMeta: {
          traits: ['msg']
        },
        close: {
          actionMeta: {}
        }
      }
    });

    it('userMsg() action creator', () => {
      expect(userMsg('Hello action-u')).toEqual({
        type: 'userMsg',
        msg:  'Hello action-u',
      });
    });

    it('userMsg type coercion', () => {
      expect(String(userMsg)).toEqual('userMsg');
    });
    
    it('userMsg.close() action creator', () => {
      expect(userMsg.close()).toEqual({
        type: 'userMsg.close',
      });
    });
    
    it('userMsg.close type coercion via string concatenation', () => {
      expect(''+userMsg.close).toEqual('userMsg.close');
    });
    
    it('userMsg.close() basic parameter validation - expecting exception', () => {
      // Error: ERROR: action-u action creator: userMsg.close() expecting 0 parameters, but received 1.
      expect(()=>userMsg.close('unexpected parameter')).toThrow('userMsg.close() expecting 0 parameters, but received 1');
    });


    it('generateActions.root() actionGenesis argument may ONLY contain a single root node', () => {
      // Error: ActionU.generateActions.root() parameter violation: actionGenesis argument may ONLY contain a single root node (what will be returned) ... userMsg,secondRootBad
      expect( () => generateActions.root({
        userMsg: {
          actionMeta: {
            traits: ['msg']
          },
          close: {
            actionMeta: {}
          }
        },
        secondRootBad: {
          actionMeta: {
          }
        }
      })
      ).toThrow('actionGenesis argument may ONLY contain a single root node');
    });

  });


  //****************************************************************************
  describe('test actionMeta.ratify (BOTH validate AND default parameters)', () => {

    const actions = generateActions({
      userMsg: {
        actionMeta: {
          traits: ['msg'],
          ratify(msg='app-default') {
            if (typeof msg !== 'string')
              throw new TypeError(`userMsg(msg) msg is NOT a string: ${msg}`);
            return [msg];
          }
        }
      }
    });

    it('userMsg() action creator', () => {
      expect(actions.userMsg('Hello action-u')).toEqual({
        type: 'userMsg',
        msg:  'Hello action-u',
      });
    });

    it('userMsg type coercion', () => {
      expect(String(actions.userMsg)).toEqual('userMsg');
    });

    it('userMsg() app-specific parameter defaults', () => {
      expect(actions.userMsg()).toEqual({
        type: 'userMsg',
        msg:  'app-default',
      });
    });

    it('userMsg(123) app-specific parameter validation - expecting exception', () => {
      expect(()=>actions.userMsg(123)).toThrow('msg is NOT a string: 123');
    });

  });



  //****************************************************************************
  describe('test actionMeta.thunk', () => {

    const actions = generateActions({
      widget: {
        fetch: { // widget.fetch(selCrit)
                 actionMeta: {
                   thunk(selCrit) { // kool - we can use this in-line function format too
                     return (dispatch, getState) => {
                       // simple test
                       //  - just validate that function is operational
                       //  - and that we can access actions at this point (generated above)!
                       //    ... implicitly through it's usage
                       //  - and that app params and thunk parms are accessable
                       return `${String(actions.widget.fetch.complete)}, selCrit: ${selCrit}, dispatch: ${dispatch}`;
                     };
                   }
                 },
          complete: { // widget.fetch.complete(widget)
                      actionMeta: {
                        traits: ['widget']
                      }
          },
        },
      }
    });

    it('widget.fetch(selCrit) action creator', () => {
      const thunk = actions.widget.fetch('selCritTest');
      const result = thunk('dispatchTest'); // a crude simulation of redux thunk middleware
      expect(result).toEqual('widget.fetch.complete, selCrit: selCritTest, dispatch: dispatchTest');
    });

    it('widget.fetch type coercion', () => {
      expect(String(actions.widget.fetch)).toEqual('widget.fetch');
    });

  });



  //****************************************************************************
  describe('generation errors, from generateActions()', () => {

    it('actionGenesis argument is required', () => {
      // Error: ActionU.generateActions() parameter violation: actionGenesis argument is required
      expect(()=>generateActions()).toThrow('actionGenesis argument is required');
    });

    it('actionGenesis argument MUST be an object literal', () => {
      // Error: ActionU.generateActions() parameter violation: actionGenesis argument is NOT an object literal
      expect(()=>generateActions(123)).toThrow('actionGenesis argument is NOT an object literal');
      expect(()=>generateActions(new Date())).toThrow('actionGenesis argument is NOT an object literal');
    });

    it('actionGenesis argument CANNOT have an actionMeta property in the root', () => {
      // Error: ActionU.generateActions() parameter violation: actionGenesis argument CANNOT have an actionMeta property in the root (i.e. the root cannot be an ActionNode, because it is unnamed)
      expect(()=>generateActions({actionMeta:{}})).toThrow('actionGenesis argument CANNOT have an actionMeta property in the root');
    });

    it('actionGenesis root must contain at least ONE sub-node (either an app-specific or an actionMeta node)', () => {
      // Error: ActionU.generateActions() actionGenesis node  must contain at least ONE sub-node (either an app-specific or an actionMeta node)
      expect(()=>generateActions({})).toThrow('must contain at least ONE sub-node');
    });

    it('actionGenesis child-node must contain at least ONE sub-node (either an app-specific or an actionMeta node)', () => {
      // Error: ActionU.generateActions() actionGenesis node userMsg must contain at least ONE sub-node (either an app-specific or an actionMeta node)
      expect(()=>generateActions({ userMsg: {} })).toThrow('must contain at least ONE sub-node');
    });

    it('actionGenesis.actionMeta must be an object literal', () => {
      // Error: ActionU.generateActions() actionGenesis node userMsg.actionMeta is NOT an object literal
      expect(()=>generateActions({userMsg:{actionMeta:'ouch'}})).toThrow('actionMeta is NOT an object literal');
    });

    it('actionGenesis.actionMeta must contain all known properties', () => {
      // Error: ActionU.generateActions() actionGenesis node userMsg.actionMeta contains unrecognized properties: bad1,bad2
      expect(()=>generateActions({userMsg:{actionMeta:{bad1:1,bad2:2}}})).toThrow('actionMeta contains unrecognized properties: bad1,bad2');
    });

    it('actionGenesis.actionMeta.traits must be a string[]', () => {
      // Error: ActionU.generateActions() actionGenesis node userMsg.actionMeta.traits is NOT a string[]
      expect(()=>generateActions({userMsg:{actionMeta:{traits:123}}})).toThrow('traits is NOT a string[]');
    });

    it('actionGenesis.actionMeta.ratify must be a function', () => {
      // Error: ActionU.generateActions() actionGenesis node userMsg.actionMeta.ratify is NOT a function
      expect(()=>generateActions({userMsg:{actionMeta:{ratify:'ouch'}}})).toThrow('ratify is NOT a function');
    });

    it('actionGenesis.actionMeta.thunk must be a function', () => {
      // Error: ActionU.generateActions() actionGenesis node userMsg.actionMeta.thunk is NOT a function ... ouch
      expect(()=>generateActions({userMsg:{actionMeta:{thunk:'ouch'}}})).toThrow('thunk is NOT a function');
    });

    it('actionGenesis.actionMeta.thunk cannot contain other properties', () => {
      // Error: ActionU.generateActions() actionGenesis node userMsg.actionMeta.thunk is NOT allowed with any other actionMeta property (found following properties: thunk,traits)
      expect(()=>generateActions({userMsg:{actionMeta:{thunk:(i)=>i,traits:['trait1']}}})).toThrow('thunk is NOT allowed with any other actionMeta property');
    });

  });

});
