import React from 'react';
import { Link } from 'react-router-dom';


const Page404 = props => (
  <div>
    <h1>404</h1>
    <p> The resource you are looking for could not be found or has been removed. </p>
    <Link to="/courses">Go to courses</Link>
  </div>
);

export default Page404;
