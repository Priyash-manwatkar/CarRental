import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [cars, setCars] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // Set Axios header whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
      fetchCars();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
      setIsOwner(false);
      setCars([]);
    }
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Login successful");
        navigate("/");
        return true;
      } else {
        toast.error(data.message || "Login failed");
        return false;
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    setCars([]);
    toast.success("Logged out successfully");
    navigate("/");
  };

  // Fetch logged-in user
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success && data.user) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        logout(); // token invalid
      }
    } catch (error) {
      toast.error("Failed to fetch user");
      logout();
    }
  };

  // Fetch cars
  const fetchCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        const carsArray = Array.isArray(data.cars)
          ? data.cars
          : data.cars
          ? Object.values(data.cars)
          : [];
        setCars(carsArray);
      } else {
        toast.error(data.message || "Failed to fetch cars");
        setCars([]);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch cars");
      setCars([]);
    }
  };

  const value = {
    axios,
    currency,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    cars,
    setCars,
    login,
    logout,
    fetchUser,
    fetchCars,
    showLogin,
    setShowLogin,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    navigate
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
