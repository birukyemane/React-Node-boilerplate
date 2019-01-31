import axios from 'axios';
const setAuthToken = token => {  
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;// set token in header if there is token
  } else {
    axios.defaults.headers.common['Authorization'] = null;
  }
};

export default setAuthToken;
