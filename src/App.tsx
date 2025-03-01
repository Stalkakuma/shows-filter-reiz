import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { UserProvider } from "./misc/UserContext";
import { Homepage } from "./pages/Homepage";
import { DetailedPage } from "./pages/DetailedPage";

function App() {
  return (
    <UserProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="show">
            <Route path=":id" element={<DetailedPage />} />
          </Route>
        </Routes>
      </Layout>
    </UserProvider>
  );
}

export default App;
