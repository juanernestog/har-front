import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../containers/CartContext';

import UserContext from '../containers/UserContext';

export default function LogOut() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { setCart } = useContext(CartContext);

  useEffect(() => {
    setUser(null);
    setCart(null);
    navigate('/login');
  }, [navigate, setUser, setCart]);

  return null;
}
