import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../containers/UserContext';

export default function LogOut() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(null);
    navigate('/login');
  }, [navigate, setUser]);

  return null;
}
