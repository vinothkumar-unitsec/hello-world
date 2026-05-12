import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MainPage from './MainPage';

function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'whitesmoke', color: 'black' }}>
      <h1>Welcome to Claude Code</h1>
      <Link to="/main">Go to main page</Link>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
