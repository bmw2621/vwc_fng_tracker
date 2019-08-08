import ReactDOM from 'react-dom';
import './index.css';
import { makeMainRoutes } from './routing/routes';
import * as serviceWorker from './serviceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faEnvelope,
  faCalendarAlt,
  faPhoneAlt,
  faPencilAlt,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons'
library.add(fab, faEnvelope, faCalendarAlt, faPhoneAlt, faPlusCircle, faPencilAlt)

const routes = makeMainRoutes();
ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
