import React from 'react';

export default function Contact() {
  return (
    <>
      <h1>¿Como contactarnos?</h1>
      <p>
        {' '}
        <ul>
          <li className="list-unstyled">
            <a href="/about"> ¿Quienes somos? </a>
          </li>
          <li className="list-unstyled">
            <p> Correo: Harvestify-info@Harvestify.com </p>
          </li>
          <li className="list-unstyled">
            <p> Linea de atencion:</p>
            <a href="tel:+573008989898"> 3008989898 </a>
          </li>
          <li className="list-unstyled">
            <br />
            <p> Direccion:</p>
            <p> Oficina Medellin: Cr 49 # 123 - 77 , Medellin, Colombia</p>
            <p> Oficina Bogotá: Cr 1 # 342 - 123 , Bogotá, Colombia </p>
          </li>
        </ul>{' '}
      </p>
    </>
  );
}
