# Getting Started

## Install

```shell
npm install --save action-u
```


## Access

All functions are exposed through [UMD](https://github.com/umdjs/umd),
and therefore accessable through any one of the following techniques ...


- **ES6 Import (Native JS)**
  
  ```js
  import { generateActions }  from 'action-u';
  -OR-
  import * as ActionU from 'action-u';
  -OR-
  import ActionU from 'action-u';
  
  generateActions(...)
  -OR-
  ActionU.generateActions(...)
  ```
  
  
- **CommonJS**
  
  ```js
  const { generateActions } = require('action-u');
  -OR-
  const ActionU = require('action-u');
  
  generateActions(...)
  -OR-
  ActionU.generateActions(...)
  ```
  
  
- **AMD**
  
  ```js
  define(['action-u', 'otherModule'], function(ActionU, otherModule) {
    ActionU.generateActions(...)
  });
  ```
  
  
- **&lt;script&gt; tag**
  
  ```
  <script src="https://unpkg.com/action-u/dist/action-u.min.js"></script>
  
  <script>
    ActionU.generateActions(...)
  </script>
  ```
