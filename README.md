React Boilerplate with redux-saga and redux-toolkits

---

## Guideline

### Redux Structure
default structure is 
- feature (user, product, item, ...)
  - action (list, get, update, delete, ...)
    - meta (status of request)
    - data

#### Create Reducer
You can use common reducer of fetching like this
```js 
import { createMetaReducer } from 'utils/createMetaReducer'

export const userReducer = combineReducers({
  list: createMetaReducer(listUserAction)
})
```

or customize uncommon reducer like this
```js
export const userReducer = combineReducers({
  list: createMetaReducer(listUserAction),
  // Customize reducer (use normal createReducer function from toolkits)
  customKey: createReducer({...initialValue}, {
    [customAction.request]: (state, action) => {
      return {...state, value: action.payload}
    }
  })
})
```

#### Create Action
Create Action with common action of fetching
```js
import { createActions } from 'utils/createActions'

export const listUserAction = createActions('LIST_USER')
```

or you can create action with uncommon action like this
```js
import { createAction } from '@reduxjs/toolkit'

// Customize action (use normal createAction function from toolkits)
export const listUserAction = createAction('LIST_USER')
```

---
#### More information
- redux-toolkits https://redux-toolkit.js.org/
- redux-saga https://github.com/redux-saga/redux-saga