import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import './assets/scss/main.scss'
import Home from './Pages/Home';
import CategoryPage from './Pages/CategoryPage';
import Footer from './Components/Footer';
import BecomeSellerForm from './Pages/BecomeSellerForm';
import SignInForm from './Pages/SignInForm';
import CreateAccount from './Pages/CreateAccount';
import Filter_product from './Pages/Filter_product';
import UserDashBoard from './Pages/UserDashBoard';
import PageNotFound from './Components/PageNotFound';
import WishListPage from './Pages/WishListPage';
import ServiceDetailsPage from './Pages/ServiceDetailsPage';
import MyCartPage from './Pages/MyCartPage';
import UserProfile from './Pages/UserProfile';
import EditUserprofile from './Pages/EditUserprofile';
import MyAddress from './Pages/MyAddress';
import AddMyAddress from './Pages/AddMyAddress';
import EditUserAddress from './Pages/EditUserAddress';
import BillingMethod from './Pages/PaymentOption/BillingMethod';
import BestSeller from './Pages/BestSeller/BestSeller';
import UserMessage from './Pages/Message/UserMessage';
import Chatuser from './Pages/Message/Chatuser';
import CustomerService from './Pages/CustomerService/CustomerService';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/become-seller-form" element={<BecomeSellerForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/category/particular/:categoryName/:subCategoryName" element={<Filter_product />} />
          <Route path="/user/dashboard" element={<UserDashBoard />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/service-detail/:serviceId/:sellerName" element={<ServiceDetailsPage />} />
          <Route path='/user/cart' element={<MyCartPage />} />
          <Route path='/user/profile' element={<UserProfile />} />
          <Route path='/user/profile/edit' element={<EditUserprofile />} />
          <Route path='/user/my-addresses/' element={<MyAddress />} />
          <Route path='/user/my-addresses/add' element={<AddMyAddress />} />
          <Route path="/user/my-addresses/edit/:userAddressId" element={<EditUserAddress />} />
          <Route path="/user/billing-method" element={<BillingMethod />} />
          <Route path="/best-seller" element={<BestSeller />} />
          <Route path="/user/messages" element={<UserMessage />} />
          <Route path='/user/messages/opened/:conversationId' element={<Chatuser />} />
          <Route path="/customer-service" element={<CustomerService />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
