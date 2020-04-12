React Boilerplate with redux-saga and redux-toolkits

--------------------------------------------------------------------------------

## Guideline

### Redux State Structure

design structural is

```json
{
  user: {
    list: {
      meta: {
        isInitialize: true,
        isRequesting: false,
        isSuccess: false,
        isFailure: false
      },
      data: {
        ...
      }
    },
    update: {
      meta: {
        isInitialize: true,
        isRequesting: false,
        isSuccess: false,
        isFailure: false
      },
      data: {
        ...
      }
    }
  },
  product: {
    list: {
      meta: {
        isInitialize: true,
        isRequesting: false,
        isSuccess: false,
        isFailure: false
      },
      data: {
        ...
      }
    },
    ...
  },
  other: {
    ...
  }
}
```

### Create Reducer

You can use common reducer of fetching like this

```javascript
import { createMetaReducer } from 'utils/createMetaReducer'

export const userReducer = combineReducers({
  list: createMetaReducer(listUserAction)
})
```

or customize uncommon reducer like this

```javascript
export const userReducer = combineReducers({
  list: createMetaReducer(listUserAction),
  // Customize reducer (use normal createReducer function from toolkits)
  customKey: createReducer({...initialValue}, {
    [customAction]: (state, action) => {
      return {...state, value: action.payload}
    }
  })
})
```

or customize uncommon reducer case and initial state like this

```javascript
import { createMetaReducer, initialState } from 'utils/createMetaReducer'

customReducerCase: createMetaReducer(listUserAction, {...initialState, customValue: false}, {
    [listUserAction.success]: (state) => {
      return {
        ...state,
        ...initialState,
        meta: { ...initialState.meta, isRequesting: true },
        data: 'custom data only for success case'
      }
    },
  }),
```

### Create Action

Create Action with common action of fetching

```javascript
import { createActions } from 'utils/createActions'

export const listUserAction = createActions('LIST_USER')
```

or you can create action with uncommon action like this

```javascript
import { createAction } from '@reduxjs/toolkit'

// Customize action (use normal createAction function from toolkits)
export const customAction = createAction('CUSTOM_ACTION')
```

--------------------------------------------------------------------------------

### More information

- redux-toolkits <https://redux-toolkit.js.org/>
- redux-saga <https://github.com/redux-saga/redux-saga>
