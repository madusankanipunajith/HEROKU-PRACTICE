import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.image_path_material = "http://localhost:5000/files/materials/";
window.image_path_product = "http://localhost:5000/files/products/";
window.image_path_admin = "http://localhost:5000/files/admin/";
window.orders = 0;

ReactDOM.render(
 
    <App />,
  document.getElementById('root')
);

