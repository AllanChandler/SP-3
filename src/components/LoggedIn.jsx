import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import facade from '../util/apiFacade';

function LoggedIn({ loggedIn }) {
  const [dataFromServer, setDataFromServer] = useState('Loading...');

  useEffect(() => {
    if (loggedIn) {
      facade.fetchData('/some-protected-endpoint') 
        .then((data) => setDataFromServer(data))
        .catch((err) => console.error('Error fetching data:', err));
    }
  }, [loggedIn]);

  return (
    <div>
      {facade.hasUserAccess('admin', loggedIn) ? (
        <div>
          <h2>Data Received from server</h2>
          <h3>{dataFromServer}</h3>
        </div>
      ) : (
        <div>
          <h2>No access, you need admin rights!</h2>
        </div>
      )}
    </div>
  );
}

LoggedIn.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default LoggedIn;
