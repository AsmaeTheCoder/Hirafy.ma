import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import RegisterArtisan from './pages/auth/RegisterArtisan';
import RegisterClient from './pages/auth/RegisterClient';
import Login from './pages/auth/Login';
import ListeCategories from './pages/categories/ListeCategories';
import Home from './pages/public/Home';
import ConsulterArtisans from './pages/public/ConsulterArtisans';
import ShowArtisan from './pages/public/ShowArtisan';
import AddCategorie from './pages/categories/AddCategorie';
import ListeSupporteurAdmin from './pages/uesr/adminSupporteur/ListeSupporteurAdmin';
import AddSupporteur from './pages/uesr/adminSupporteur/AddSupporteur';
import ListeClients from './pages/uesr/client/ListeClients';
import ListeArtisans from './pages/uesr/artisan/ListeArtisans';
import ResetPassword from './pages/auth/profil/ResetPassword';
import GetProfil from './pages/auth/profil/GetProfil';
import UpdateProfil from './pages/auth/profil/UpdateProfil';
import ForgetPassword from './pages/auth/forgetPassword/ForgetPassword';
import ListeContactUs from './pages/contactUs/ListeContactUs';
import AddContactUs from './pages/contactUs/AddContactUs';
import ListeReclamations from './pages/reclamation/ListeReclamations';
import ListeReviews from './pages/reviews/ListeReviews';
import AddReclamation from './pages/reclamation/AddReclamation';
import LayoutDashboard from './components/layouts/LayoutDashboard';
import LayoutHome from './components/layouts/LayoutHome';
import LayoutAuth from './components/layouts/LayoutAuth';
import { HelmetProvider } from 'react-helmet-async';
import { AppLayout } from './components/layouts/AppLayout';
import { Permission } from './pages/authorize/Permission';
import { ConfirmProvider } from 'material-ui-confirm';
import Gallery from './pages/auth/profil/Gallery';
import { useAppSelector } from './app/hooks';
import { RootState } from './app/store';

function App() {
  const user = useAppSelector((state: RootState) => state.auth.user); 

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <HelmetProvider>
          <AppLayout>
            <ConfirmProvider>
              <Routes>
                <Route element={<LayoutAuth/ >}>
                  <Route path='/login' element={<Login />} />
                  
                  <Route path='/registerClient' element={<RegisterClient />} />

                  <Route path='/registerArtisan' element={<RegisterArtisan />} />

                  <Route path='/forgetPassword' element={<ForgetPassword />} />
                </Route>
                
                  <Route path='/' element={<LayoutHome />}>
                    <Route index element={<Home />}  />

                    <Route path="/consulterArtisans/:id" element={<ConsulterArtisans />} />
                    
                    <Route path='/addContactUs' element={<AddContactUs />} />
                  </Route>

                  <Route element={<LayoutDashboard />} >

                    <Route path='/listeClients' element={<Permission can='liste clients'><ListeClients /></Permission>} />

                    <Route path='/listeArtisans' element={<Permission can='liste artisans'><ListeArtisans /></Permission>} />

                    <Route path='/listeSupporteurAdmin' element={<Permission can='liste supporteurs'><ListeSupporteurAdmin /></Permission>} />
                    <Route path='/addSupporteurAdmin' element={<Permission can='ajouter supporteur'><AddSupporteur /></Permission>} />
                    
                    <Route path='/listeCategories' element={<Permission can='liste categories'><ListeCategories /></Permission>} />
                    <Route path='/addCategorie' element={<Permission can='ajouter categorie'><AddCategorie /></Permission>} />

                    <Route path='/listeReclamations' element={<Permission can='liste reclamation'><ListeReclamations /></Permission>} />
                    <Route path='/addReclamation' element={<Permission can='envoyer reclamation'><AddReclamation /></Permission>} />

                    <Route path='/listeContactUs' element={<Permission can='liste contacts'><ListeContactUs /></Permission>} />

                    <Route path="/showArtisan/:id" element={<ShowArtisan />} />

                    <Route path='/getProfil' element={<GetProfil />} />
                    <Route path='/updateProfil' element={<Permission can='gerer profil'><UpdateProfil /></Permission>} />
                    <Route path='/resetPassword' element={<Permission can='modifier password'><ResetPassword /></Permission>} />

                    {user?.role=="artisan" && <Route path='/gallery' element={<Gallery />} />}
                    
                    {user?.role=="admin" && <Route path='/listeReviews' element={<ListeReviews />} />}
                    
                  </Route>   
                  
              </Routes>
            </ConfirmProvider> 
          </AppLayout>
        </HelmetProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
