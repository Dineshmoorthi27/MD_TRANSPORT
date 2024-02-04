import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const {user} = useSelector(state => state.users) 
  return (
    <div className='m-5'>
    <h1>MD Transport</h1>
    {user && <h2>welcome {user?.name}</h2>}
    </div>
  );
}

export default Home;
