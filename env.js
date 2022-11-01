function getApiUrl() {
  //! temp
  let env = 'prod';

  switch(env) {
    case 'dev':
      return 'http://localhost:4000'; //this is what the BE is running on in development
    default:
      return 'https://supertonic-backend.herokuapp.com';
  }
}

export const apiUrl = getApiUrl();