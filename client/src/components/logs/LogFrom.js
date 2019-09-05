import React, { useState, useContext, useEffect } from 'react';
import LogContext from '../../context/log/logContext';

const LogFrom = () => {
  const logContext = useContext(LogContext);

  const { addLog, current, clearCurrent, updateLog } = logContext;

  useEffect(() => {
    if (current !== null) {
      setLog(current);
    } else {
      setLog({
        message: '',
        emp_res: '',
        type: '',
        contact: '',
        con_email: '',
        con_phone: '',
        emp_res: '',
        src_url: ''
      });
    }
  }, [logContext, current]);

  const [log, setLog] = useState({
    message: '',
    type: '',
    emp_res: '',
    contact: '',
    con_email: '',
    con_phone: '',
    emp_res: '',
    src_url: ''
  });

  const { message, type, contact, con_email, con_phone, emp_res, src_url } = log;

  const onChange = e =>
    setLog({
      ...log,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addLog(log);
    } else {
      updateLog(log);
    }

    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Log' : 'Add Log'}</h2>
      <input
        type='text'
        placeholder='Message'
        name='message'
        value={message}
        onChange={onChange}
        required
      />
      {/* CONTACT INFO */}
      <h5>Contact Info</h5>
      <input
        type='text'
        placeholder='Contact Name'
        name='contact'
        value={contact}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Contact Phone'
        name='con_phone'
        value={con_phone}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Contact Email'
        name='con_email'
        value={con_email}
        onChange={onChange}
      />
      <input
        type='url'
        placeholder='Source URL'
        name='src_url'
        value={src_url}
        onChange={onChange}
      />
      {/* ------------------------------------ SOURCE TYPES */}
      <h5>Type</h5>
      <input
        type='checkbox'
        name='type'
        value='important'
        onChange={onChange}
      />{' '}
      Important{' '}
      <input type='checkbox' name='type' value='regular' onChange={onChange} />{' '}
      Regular
      {/* ------------------------------------ LEAD SOURCES  */}
      <h5> Lead Source</h5>
      <input
        type='radio'
        name='emp_res'
        value='craigslist'
        onChange={onChange}
      />{' '}
      CL{' '}
      <input type='radio' name='emp_res' value='facebook' onChange={onChange} />{' '}
      FB <input type='radio' name='emp_res' value='fba' onChange={onChange} />{' '}
      FBA{' '}
      <input type='radio' name='emp_res' value='personal' onChange={onChange} />{' '}
      Personal{' '}
      <input type='radio' name='emp_res' value='james' onChange={onChange} />{' '}
      James{' '}
      <input type='radio' name='emp_res' value='alex_m' onChange={onChange} />{' '}
      Alex_M{' '}
      <input type='radio' name='emp_res' value='martin' onChange={onChange} />{' '}
      Martin{' '}
      <input type='radio' name='emp_res' value='john_c' onChange={onChange} />{' '}
      John_C
      {/* DATE EXPIRES */}
      <h5>Date Expire</h5>
      <input type='date' name='date_exp' />
      {/* SUBMIT BUTTON */}
      <div>
        <input
          type='submit'
          value={current ? 'Update Log' : 'Add Log'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default LogFrom;
