import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import { AuthCallBackPage } from "./pages/auth-callback/AuthCallBackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import AuthPage from "./pages/auth/AuthPage";
import AlbumPage from "./pages/album/AlbumPage";
import PlaylistPage from "./pages/playlist/PlaylistPage";
import AdminPage from "./pages/admin/AdminPage";
import { Toaster } from "react-hot-toast";
import SearchResultsPage from "./pages/search/SearchResultsPage";
import VerifyPage from "./pages/auth/VerifyPage";
import SignUpForm from "./pages/auth/SignUpForm";
function App() {
  return (
    <>
      <Routes>
        
        <Route 
          path="/sso-callback" 
          element={<AuthenticateWithRedirectCallback
          signUpForceRedirectUrl="/auth-callback"
        />}/>
        <Route path="/auth-callback" element= {<AuthCallBackPage/>}/>
        <Route path="/admin" element= {<AdminPage/>}/>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element= {<HomePage/>}/>
          <Route path="/playlists" element= {<PlaylistPage/>}/>
          <Route path="/search/:query" element={<SearchResultsPage />} />
          <Route path="/albums/:albumId" element= {<AlbumPage/>}/>
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
