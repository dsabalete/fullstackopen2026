import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import store from './store'
import { NotificationContextProvider } from './contexts/NotificationContext'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>,
)
