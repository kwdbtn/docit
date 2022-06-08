import { useState } from "react";
import "./App.css";
import ActionBar from "./components/ActionBar";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import SiteModal from "./components/SiteModal";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Site from "./components/Site";
import Login from "./components/Login";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const [token, setToken] = useState();

  const handleModal = (val, e) => {
    e.preventDefault();
    setModalData(val);
    setOpenModal(!openModal);
  };

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <Router>
      <div className="flex flex-col">
        <div className="flex flex-col w-full">
          <Navbar />
          <ActionBar />
        </div>
        <div className="flex">
          {/* display side menu */}
          <SideMenu showModal={handleModal} />

          {/* show modal to create new site */}
          {openModal && (
            <SiteModal modalData={modalData} closeModal={handleModal} />
          )}

          {/* routes to display various views */}
          <div className="m-5 w-full">
            <Routes>
              {/* <Route path="/" element={<Login />}></Route> */}
              <Route
                path="/sites/:id"
                element={<Site showModal={handleModal} />}
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
