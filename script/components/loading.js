import React from 'react';

import {
    CircularProgress
} from 'material-ui';

const Loading = ({inline}) => (

    <div className={"loading " + (inline ? 'inline' : '')}>
        <CircularProgress className="spinner"  />
    </div>

);

export default Loading;