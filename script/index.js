import React from 'react';
import { render } from 'react-dom'
import Root from './root'
import store from './redux/store';

require("!style-loader!css-loader!less-loader!../less/index.less");

render(
    <Root store={store} />,
    document.getElementById('application')
);