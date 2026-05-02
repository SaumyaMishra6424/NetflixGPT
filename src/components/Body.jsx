import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Browse from "../pages/Browse";
import MovieDetail from "../pages/MovieDetail";
import GptSearch from "../pages/GptSearch";
import ProtectedRoute from "./ProtectedRoute";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";


import { onSnapshot, doc } from "firebase/firestore";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },

  {
    path: "/gpt",
    element: (
      <ProtectedRoute>
        <GptSearch />
      </ProtectedRoute>
    ),
  },

  {
    path: "/browse",
    element: (
      <ProtectedRoute>
        <Browse />
      </ProtectedRoute>
    ),
  },

  { path: "/movie/:id", element: <MovieDetail /> },
]);

const Body = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeFirestore = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);

        // 🔥 REAL-TIME LISTENER
        unsubscribeFirestore = onSnapshot(
          docRef,
          (docSnap) => {
            if (docSnap.exists()) {
              dispatch(
                addUser({
                  uid: user.uid,
                  isPremium: docSnap.data().isPremium || false,
                })
              );
            } else {
              dispatch(addUser({ uid: user.uid, isPremium: false }));
            }
          },
          (error) => {
            console.error(error);
            dispatch(addUser({ uid: user.uid, isPremium: false }));
          }
        );
      } else {
        dispatch(removeUser());
      }
    });

 
    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default Body;