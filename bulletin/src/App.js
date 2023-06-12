import './App.css';
import BoardDetail from './component/BoardDetail';
import BoardList from "./component/BoardList";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BoardList />} />
          <Route path="/detail/:id" element={<BoardDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
