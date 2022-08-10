import { useEffect } from 'react';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  useEffect(() => {

  });

  return (
    <div className='bg-background'>
      {/* Header */}
      <Header />
      {/* Main */}
      <Main />
      {/* Footer */}
    </div>
  );
}

export default App;
