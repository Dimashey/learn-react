import {useEffect, useState} from 'react';

export default httpClient => {
  const [ error, setError ] = useState(null);
  /**
   * componentWillMount
   * */
  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
    setError(err);
  });
  /**
   * componentWillMount end
   * */

  /**
   * instead componentWillUnmount
   * */
  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    }
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
}