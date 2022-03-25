import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { IntlProvider } from 'react-intl'
import 'api/api-interceptor'
import i18nMessages from './langs'
import { store, persistor } from './store'
import Router from './routes'

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* TODO should implement language to many languages */}
        <IntlProvider messages={i18nMessages.en} locale="en" defaultLocale="en">
          <Router />
        </IntlProvider>
      </PersistGate>
    </Provider>
  )
}

export default hot(App)
