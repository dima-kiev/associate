import ReactDOM from 'react-dom';
import React from 'react';
import Root from './containers/Root';
import configStore from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'startbootstrap-sb-admin-2/dist/css/sb-admin-2.css';
import 'startbootstrap-sb-admin-2/dist/css/timeline.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-select/dist/react-select.css';
import './style.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import 'react-date-picker/index.css';

const store = configStore();
ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('content')
);