import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import { makeMainRoutes } from './routing/routes'
import * as serviceWorker from './serviceWorker'
import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { AUTH_CONFIG } from './auth_config'
import {
  faEnvelope,
  faCalendarAlt,
  faPhoneAlt,
  faPencilAlt,
  faPlusCircle,
  faTrash,
  faCloudUploadAlt,
  faBold,
  faItalic,
  faFileImage as faFileImageO,
  faListUl,
  faLink
} from '@fortawesome/free-solid-svg-icons'
import { Auth0Provider } from './react-auth0-wrapper'
import { App } from "./App"

const config = AUTH_CONFIG
library.add(
  fab,
  faEnvelope,
  faCalendarAlt,
  faPhoneAlt,
  faPlusCircle,
  faPencilAlt,
  faTrash,
  faCloudUploadAlt,
  faBold,
  faItalic,
  faFileImageO,
  faListUl,
  faLink
)

dom.watch()
// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config['domain']}
    client_id={config['clientID']}
    redirect_uri={window.location.origin}
>
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();

