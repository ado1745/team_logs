import React, { Fragment, useContext, useEffect } from 'react';
import LogContext from '../../context/log/logContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LogItem from './LogItem';
import Spinner from '../layout/Spinner';

const Logs = () => {
  const logContext = useContext(LogContext);

  const { logs, filtered, getLogs, loading } = logContext;

  useEffect(() => {
    getLogs();
    //eslint-disable-next-line
  }, []);

  if (logs !== null && logs.length === 0 && !loading) {
    return <h4>Please enter log</h4>;
  }

  return (
    <Fragment>
      {logs !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(log => (
                <CSSTransition key={log._id} timeout={500} classNames='item'>
                  <LogItem log={log} />
                </CSSTransition>
              ))
            : logs.map(log => (
                <CSSTransition key={log._id} timeout={500} classNames='item'>
                  <LogItem log={log} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Logs;
