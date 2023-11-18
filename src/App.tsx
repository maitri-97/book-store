import "./App.css";
import AppHeader from "./components/AppHeader";
import AppSidebar from "./components/AppSidebar";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <>
      <div className="App">
        <AppHeader />
        <div className="main-wrap">
          <AppSidebar />
          <div className="content-wrap">
            <Dashboard />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
