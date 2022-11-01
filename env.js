function getApiUrl() {
  //! temp
  let env = 'dev';

  switch(env) {
    case 'dev':
      return 'http://localhost:4000'; //this is what the BE is running on in development
    default:
      return 'https://api.supertonic.vercel.app';
  }
}

export const apiUrl = getApiUrl();