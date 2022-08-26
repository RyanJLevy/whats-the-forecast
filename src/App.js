import { useEffect } from 'react';
import AppContextWrapper from './AppContext';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  useEffect(() => {

  });

  return (
    <AppContextWrapper>
      <div className='bg-background h-screen w-full overflow-hidden relative'>
        {/* Header */}
        <Header />
        {/* Main */}
        <Main />
        {/* Footer */}
        <Footer />
      </div>
    </AppContextWrapper>
  );
}

export default App;
