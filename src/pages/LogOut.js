import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCart } from '../api/carts';
import swal from 'sweetalert';

import CartContext from '../containers/CartContext';
import UserContext from '../containers/UserContext';

export default function LogOut() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    async function removeCart() {
      await deleteCart({ id: cart.id });
    }
    cart && removeCart();
    setUser(null);
    setCart(null);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    navigate('/login');
    swal('Exito', 'Sesión cerrada', 'success');
  }, [navigate, setUser, cart, setCart]);

  return null;
}
