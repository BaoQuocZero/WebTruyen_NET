import logo from './logo.svg';
import './App.css';
import Homepage from './Component/Homepage/Homepage';
import Nav from './Component/Nav/Nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <header className="App-header">
        <>
          <Homepage />
        </>
      </header>
    </div>
  );
}

export default App;
