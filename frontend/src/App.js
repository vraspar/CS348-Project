import React from 'react';
import QueryPage from './components/queryPage';
import env from 'react-dotenv';
function App() {
  
  return (
    <div>
    {env.SERVER_URL}
    <QueryPage />
    </div>
  );
}

export default App;