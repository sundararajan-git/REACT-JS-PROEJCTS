import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedLayout from "./layout/ProtectedLayout";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
