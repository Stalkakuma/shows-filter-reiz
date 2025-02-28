import { Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { StoreProvider } from "./misc/UserContext";
import { Homepage } from "./pages/Homepage";
import { DetailedPage } from "./pages/DetailedPage";

function App() {
  return (
    <StoreProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="show">
            <Route path=":id" element={<DetailedPage />} />
          </Route>
        </Routes>
      </Layout>
    </StoreProvider>
  );
}

export default App;
