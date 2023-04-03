import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { ThemeProvider } from './theme'
import { store } from './redux'
import { SideBarNavigation } from './authenticated/navigation'

const App = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <SideBarNavigation />
      </ThemeProvider>
    </ReduxProvider>
  )
}

export default App
