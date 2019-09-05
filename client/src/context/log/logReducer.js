import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  FILTER_LOG,
  CLEAR_FILTER,
  LOG_ERROR,
  CLEAR_LOGS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload
      };

    case ADD_LOG:
      return {
        ...state,
        logs: [action.payload, ...state.logs]
      };

    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map(log =>
          log._id === action.payload._id ? action.payload : log
        )
      };

    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log._id !== action.payload)
      };

    case CLEAR_LOGS:
      return {
        ...state,
        logs: null,
        filtered: null,
        error: null,
        current: null
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };

    case FILTER_LOG:
      return {
        ...state,
        filtered: state.logs.filter(log => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return log.message.match(regex) || log.type.match(regex) || log.emp_res.match(regex) || log.con_phone.match(regex)
            || log.contact.match(regex)
        })
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };

    case LOG_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
