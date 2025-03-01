import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { UserProvider } from "./misc/UserContext";
import { Homepage } from "./pages/Homepage";
import { DetailedPage } from "./pages/DetailedPage";
import { Favorites } from "./pages/Favorites";

function App() {
  return (
    <UserProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="show">
            <Route path=":id" element={<DetailedPage />} />
          </Route>
        </Routes>
      </Layout>
    </UserProvider>
  );
}

export default App;
