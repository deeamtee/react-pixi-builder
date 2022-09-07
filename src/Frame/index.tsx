import React from 'react';
import ReactDOM from 'react-dom';
import FrameContent from './FrameContent';

const root = document.getElementById('app');
window['React'] = React;
window['ReactDOM'] = ReactDOM;

ReactDOM.render(<FrameContent />, root);