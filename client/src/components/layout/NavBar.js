import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import LogContext from '../../context/log/logContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const logContext = useContext(LogContext);

  const { isAuthenticated, logout, employee } = authContext;
  const { clearLogs } = logContext;

  const onLogout = () => {
    logout();
    clearLogs();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {employee && employee.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary' style={navStyle}>
      <i className={icon}> {title}</i>

      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

const navStyle = {
  position: 'fixed'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Team Logs',
  icon: 'fas fa-id-card-alt'
};

export default Navbar;
