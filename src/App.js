import "./App.css";
import AuthForm from "./components/Auth";
import { auth } from "./config/firebaseConfig";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CreateOrder from "./components/CreateOrder";
import { getUser } from "./api/getUser";
import ChooseFoodBank from "./components/ChooseFoodBank";
import ChooseRestaurantName from "./components/ChooseRestaurantName";
import { editUser } from "./api/editUser";
import Track from "./components/Track";

function App() {
  const [user, setUser] = useState(null); // `null` for no user, user object for logged-in user
  const [loading, setLoading] = useState(true);

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully.");
        setUser(null);
      })
      .catch((error) => {
        console.error("Error during sign out:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (result) => {
      if (result) {
        const firebaseUser = await getUser(result.email);
        setUser({ isLoggedIn: true, ...firebaseUser });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="grid h-screen place-items-center font-bold text-xl">
        Loading...
      </div>
    );
  }

  const addRestaurantName = async (id, name) => {
    const firebaseUser = await editUser(id, name);
    setUser({ isLoggedIn: true, ...firebaseUser });
  };

  return (
      <Router>
        <Routes>
          {/* Auth Route */}
          {!user && (
            <Route path="/auth" element={<AuthForm setUser={setUser} />} />
          )}

          {/* Protected Routes */}
          {user && user.restaurantName && (
            <Route path="/" element={<Home onLogout={logout} />} />
          )}
          {user && user.restaurantName && (
            <Route path="/create-order" element={<CreateOrder />} />
          )}
          {user && <Route path="/track/:orderId" element={<Track user={user}/>} />}
          {user && (
            <Route
              path="/choose-restaurant-name"
              element={
                <ChooseRestaurantName
                  user={user}
                  onSubmit={addRestaurantName}
                />
              }
            />
          )}
          {user && user.restaurantName && (
            <Route path="/choose-food-bank" element={<ChooseFoodBank />} />
          )}

          {/* Redirects */}
          {!user && <Route path="*" element={<Navigate to="/auth" />} />}
          {!user?.restaurantName && (
            <Route
              path="*"
              element={<Navigate to="/choose-restaurant-name" />}
            />
          )}
          {user && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
      </Router>
  );
}

export default App;
