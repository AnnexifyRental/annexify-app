const awsConfig = {
    Auth: {
      region: 'ap-southeast-1',
      userPoolId: 'ap-southeast-1_AmHl2fkhX',
      userPoolWebClientId: '3j164aptj9mu6pri50n64rlaq',
      oauth: {
        domain: 'annexify.auth.ap-southeast-1.amazoncognito.com',
        scope: ['email', 'openid', 'phone'],
        redirectSignIn: 'https://localhost:8080',
        redirectSignOut: 'https://localhost:8080',
        responseType: 'token'
      }
    }
  };
  
  export default awsConfig;