import React, { useReducer } from 'react';
import logReducer from './logReducer';
import LogContext from './logContext';
import axios from 'axios';
import {
  GET_LOGS,
  CLEAR_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  FILTER_LOG,
  CLEAR_FILTER,
  LOG_ERROR
} from '../types';

const LogState = props => {
  const initialState = {
    logs: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(logReducer, initialState);

  // GET LOGS
  const getLogs = async () => {
    try {
      const res = await axios.get('/api/logs');
      dispatch({ type: GET_LOGS, payload: res.data });
    } catch (err) {
      // dispatch({ type: LOG_ERROR, payload: err.response.msg });
    }
  };

  // ADD LOGS
  const addLog = async log => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/logs', log, config);
      dispatch({ type: ADD_LOG, payload: res.data });
    } catch (err) {
      // dispatch({ type: LOG_ERROR, payload: err.response.msg });
    }
  };

  // DELETE LOGS
  const deleteLog = async _id => {
    try {
      const res = await axios.delete(`/api/logs/${_id}`);
      dispatch({ type: DELETE_LOG, payload: _id });
    } catch (err) {
      // dispatch({ type: LOG_ERROR, payload: err.response.msg });
    }
  };

  //UPDATE LOG
  const updateLog = async log => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/logs/${log._id}`, log, config);

      dispatch({
        type: UPDATE_LOG,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LOG_ERROR,
        payload: err.response.msg
      });
    }
  };
  //CLEAR LOGS
  const clearLogs = () => {
    dispatch({ type: CLEAR_LOGS });
  };

  // SET CURRENT LOG
  const setCurrent = log => {
    dispatch({ type: SET_CURRENT, payload: log });
  };
  // CLEAR CURRENT LOG
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //FILTERED LOGS
  const filterLogs = text => {
    dispatch({ type: FILTER_LOG, payload: text });
  };
  //CLEAR FILTER
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <LogContext.Provider
      value={{
        logs: state.logs,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addLog,
        deleteLog,
        setCurrent,
        clearCurrent,
        updateLog,
        clearFilter,
        filterLogs,
        getLogs,
        clearLogs
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};

export default LogState;
