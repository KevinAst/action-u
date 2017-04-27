import generateActions from './action/generateActions';

//*** 
//*** Promote all library utilities through a single module.
//*** 

// NOTE: This non-default export supports ES6 imports.
//       Example:
//         import { generateActions } from 'action-u';
//       -or-
//         import * as ActionU from 'action-u';
export {
  generateActions,
};

// NOTE: This default export supports CommonJS modules (otherwise Babel does NOT promote them).
//       Example:
//         const { generateActions } = require('action-u');
//       -or-
//         const ActionU = require('action-u');
export default {
  generateActions,
};
