import { useDispatch } from 'react-redux';
import { changeTheme } from '../redux/reducers';
import { useCallback, useEffect } from 'react';

export const useToggleTheme = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedMode = window.localStorage.getItem('mode');

    dispatch(
      changeTheme({
        payload: storedMode,
      })
    );
  }, []);

  const toggle = useCallback(
    (mode: 'light' | 'dark') => {
      window.localStorage.setItem('mode', mode);

      dispatch(
        changeTheme({
          payload: mode,
        })
      );
    },
    [dispatch]
  );

  return toggle;
};
