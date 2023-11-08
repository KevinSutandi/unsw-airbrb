import React from 'react';
import { useParams } from 'react-router';

export default function EditListing () {
  const { id } = useParams();

  return <div>EditListing {id}</div>;
}
