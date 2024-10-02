import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Pages from './pages';
import TagManager from './components/PreferenceTagComponent';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Pages.Home />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/preference-tags" element={<TagManager />} />
            <Route path="/view-products" element={<Pages.ProductList />} />
            <Route path="/product/:productName" element={<Pages.ProductDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
