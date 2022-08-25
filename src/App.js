import { useEffect } from 'react';
import AppContextWrapper from './AppContext';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  useEffect(() => {

  });

  return (
    <AppContextWrapper>
      <div className='bg-background h-screen w-full overflow-hidden'>
        {/* Header */}
        <Header />
        {/* Main */}
        <Main />
        {/* Footer */}
      </div>
    </AppContextWrapper>
  );
}

export default App;
