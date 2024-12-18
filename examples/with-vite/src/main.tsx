import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactPlock } from './ReactPlock';

import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReactPlock />
  </React.StrictMode>
);
