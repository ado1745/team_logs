import React, { useContext, useEffect } from 'react';
import Logs from '../logs/Logs';
import LogForm from '../logs/LogFrom';
import LogFiler from '../logs/LogFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadEmployee } = authContext;

  useEffect(() => {
    loadEmployee();
    //eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2' style={gridStyle}>
      <div>
        <LogFiler />
        <Logs />
      </div>

      <div>
        <LogForm />
      </div>
    </div>
  );
};

const gridStyle = {
  marginTop: '50px',
  overflow: 'auto'
};

export default Home;
