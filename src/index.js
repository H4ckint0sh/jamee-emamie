import React from 'react'
import { render } from 'react-dom'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


render(
  <React.StrictMode>
		<StylesProvider jss={jss}>
			<App />
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: (reg) => {
    window.update = () => {
      try {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' })
        window.location.reload()
      } catch (error) {
        console.warn('error', error)
      }
    }
  },
})
