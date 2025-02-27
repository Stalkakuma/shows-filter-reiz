import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { StoreProvider } from "./misc/UserContext";
import { Homepage } from "./pages/Homepage";

function App() {
  return (
    <StoreProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Layout>
    </StoreProvider>
  );
}

export default App;
