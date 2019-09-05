import React, { useContext, useRef, useEffect } from 'react';
import LogContext from '../../context/log/logContext';

const LogFilter = () => {
  const logContext = useContext(LogContext);
  const text = useRef('');
  const { clearFilter, filterLogs, filtered } = logContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterLogs(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        type='text'
        ref={text}
        placeholder='Filter Logs'
        onChange={onChange}
      />
    </form>
  );
};

export default LogFilter;
