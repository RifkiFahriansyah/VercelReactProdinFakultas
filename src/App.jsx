import React, {Suspense} from "react"
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"

const Home = React.lazy(() => import("./components/Home"));
const FakultasList = React.lazy(() => import("./components/Fakultas/List"));
const FakultasCreate = React.lazy(() => import("./components/Fakultas/Create"));
const FakultasEdit = React.lazy(() => import("./components/Fakultas/Edit"))
const ProdiList = React.lazy(() => import("./components/Prodi/List"));
const ProdiCreate = React.lazy(() => import("./components/Prodi/Create"));
const ProdiEdit = React.lazy(() => import("./components/Prodi/Edit"));

function App() {
  return(
    <Router>
     {/* navbar */}
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">MDP</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className={( {isActive} ) => `nav-link ${isActive ? "active" : ""}`} aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => `nav-link ${isActive ? "active" : ""}`} to="/fakultas">Fakultas</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => `nav-link ${isActive ? "active" : ""}`} to="/prodi">Prodi</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
<div className="container">
     <Suspense fallback={<div>Loading....</div>}>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fakultas" element={<FakultasList />} />
        <Route path="/fakultas/create" element={<FakultasCreate />} />
        <Route path="/fakultas/edit/:id" element={<FakultasEdit />} />
        <Route path="/prodi" element={<ProdiList />} />
        <Route path="/prodi/create" element={<ProdiCreate />} />
        <Route path="/prodi/edit/:id" element={<ProdiEdit />} />
     </Routes>
     </Suspense>
     <div className="mt-2">&copy; 2024 Mahasiswa</div>
     </div>
    </Router>
  )
}

export default App
