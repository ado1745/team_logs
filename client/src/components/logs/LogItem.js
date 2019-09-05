import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LogContext from '../../context/log/logContext';
import Moment from 'react-moment'

const LogItem = ({ log }) => {
  const logContext = useContext(LogContext);
  const { deleteLog, setCurrent, clearCurrent } = logContext;

  const { _id, message, type, contact, con_email, con_phone, emp_res, src_url } = log;

  const onDelete = () => {
    deleteLog(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {message}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'important' ? 'badge-danger' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
        <span
          style={{ float: 'right' }}
          className={emp_res && 'badge-source'}
        >
          {emp_res}
        </span>
      </h3>

      <ul className='list'>
        {contact && (
          <li>
            <i className='fas fa-user-tie'> {contact}</i>
          </li>
        )}
        {con_email && (
          <li>
            <i className='fas fa-envelope-open'> {con_email}</i>
          </li>
        )}
        {con_phone && (
          <li>
            <i className='fas fa-phone'> {con_phone}</i>
          </li>
        )}
        {src_url && (
          <li>
            <i className='fas fa-link'> <a href={src_url} target="_blank">{src_url}</a></i>
          </li>
        )}
      </ul>

      <p>
        <button className='btn btn-dark btn-sm' onClick={() => setCurrent(log)}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>

      <span>Create on : <Moment format='MMMM Do YYYY, h:mm:ss a'>{log.date}</Moment></span>
    </div>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired
};

export default LogItem;
