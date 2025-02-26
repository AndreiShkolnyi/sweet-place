import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import NewUsers from "./pages/Users";
import Account from "./pages/Account";
import { GlobalStyles } from "./styles/GlobalStyles";
import AppLayout from "./ui/layouts/AppLayout";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/bookings' element={<Bookings />} />
            <Route path='/cabins' element={<Cabins />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/users' element={<NewUsers />} />
            <Route path='/account' element={<Account />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
