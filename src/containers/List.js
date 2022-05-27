import React, { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import ItemCard from '../components/ItemCard';
// import { getTweets } from '../api/tweets';

export default function List() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <>
      {error && <Alert variant="danger">={error}</Alert>}
      {data.map((item) => (
        <div
          key={item.id}
          onClick={function(event) {
            navigate(`/item/${item.id}`);
          }}
        >
          <ItemCard user={item.user} content={item.content} date={item.date} />
        </div>
      ))}
    </>
  );
}
