import React, { useState, useEffect, useRef, useDeferredValue } from "react";
import { Link,useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { ProfileDropdown } from "./ProfileDropdown";
import moon from "../../assets/moon.png";
import { useDispatch, useSelector } from "react-redux";
import { selectHostel, setTheme } from "../../redux/Index";
import LightModeIcon from "@mui/icons-material/LightMode";
import { getVerifiedHostel } from "../../function/Hostel";
import { motion } from "framer-motion";
import AdvanceSearch from "./AdvanceSearch";


const Navbar = () => {

  const [openProfile, setOpenProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [hostels, setHostels] = useState([]);
  const [isAdvSearch, setIsAdvSearch] = useState(false);

  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const storage = useSelector((state) => state);


  const toggleTheme = () => {
    dispatch(setTheme());
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setOpenProfile(false);
    }

  };

  const fetchHostels = async () => {
    const res = await getVerifiedHostel();
    setHostels(res);
  }
  const searchHandler = (e) => {
    let value = e.target.value;
    let filteredHostels = hostels.filter(hostel => hostel.title.toLowerCase().includes(value.toLowerCase()));
    setSearch(value ? filteredHostels : []);
  }

  const HostelNavigateHandler = (hostel) => {
    dispatch(selectHostel({ hostel: hostel }))
    setSearch([])
    searchRef.current.value = null
    navigate('/hosteldetail')
  }

  useEffect(() => {
    fetchHostels();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <div>
      <nav>
        <Link to="/" className="link">
          <span>
            <span className="material-symbols-outlined">home</span>
            <p>Sanoghar</p>
          </span>
        </Link>
        <div className="search" >
          <input type="text" ref={searchRef} onChange={(e) => searchHandler(e)} placeholder="Search" />
          {search.length > 0 && <div className="search-results">
            {search && search.map((hostel) => <div className="item" onClick={() => HostelNavigateHandler(hostel)} >{hostel.title}</div>)}
          </div>}

          {
            isAdvSearch ? <motion.div className="adv-search" initial={{ y: "-100" }} animate={{ y: -20 }} transition={{ type: "spring", duration: 0.5, stiffness: 100 }} ><AdvanceSearch setIsAdvSearch={setIsAdvSearch} /></motion.div>
              :
              <button onClick={() => setIsAdvSearch((prev) => !prev)} >Adv</button>
          }

        </div>
        <ul>
          <li>
            <Link to='/' className={`link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to='/about' className={`link ${location.pathname === '/about' ? 'active' : ''}`}>
              About
            </Link>
          </li>
          <li>
            <Link to='/map' className={`link ${location.pathname === '/map' ? 'active' : ''}`}>
              Map
            </Link>
          </li>
          <li>
            <Link to='hostel' className={`link ${location.pathname === '/hostel' ? 'active' : ''}`}>
              Hostel
            </Link>
          </li>
          <li
            className="profile"
            ref={profileRef}
            onClick={() => setOpenProfile((prev) => !prev)}
          >
            {storage.user ? (
              <>
                {storage.user.username}
                {openProfile && <ProfileDropdown />}
              </>
            ) : (
              <button className="null" >
                <Link
                  to="/login"
                  className="link"
                  onClick={() => setOpenProfile((prev) => !prev)}
                >
                  Login
                </Link>
              </button>
            )}
          </li>
          <li className="toggle">
            <div onClick={() => toggleTheme()}>
              {storage.theme === "light-theme" ? (
                <img src={moon} alt="Moon Icon" />
              ) : (
                <LightModeIcon />
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
