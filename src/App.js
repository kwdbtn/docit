import { useState } from "react";
import "./App.css";
import ActionBar from "./components/ActionBar";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import SiteModal from "./components/SiteModal";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Site from "./components/Site";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleModal = (val, e) => {
    e.preventDefault();
    setModalData(val);
    setOpenModal(!openModal);
  };

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
              <Route path="/" element={<Home />}></Route>
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
