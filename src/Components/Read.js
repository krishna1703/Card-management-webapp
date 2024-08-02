import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../Firebase/firebaseConfig";
import { Link } from "react-router-dom";

const Read = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all data from Firebase
  const fetchData = async () => {
    try {
      const snapshot = await getDocs(collection(db, "users"));
      const user_data = snapshot.docs.map((items) => {
        return { ...items.data(), id: items.id };
      });
      setUserData(user_data);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "users", id));
      // Fetch data again to update the list after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="container mt-5">
      {isLoading && (
        <div className="alert alert-danger mb-2 mt-2" role="alert">
          Data deleted...
        </div>
      )}
      <div className="row">
        {userData.length <=0 ? (<h2>no card found</h2>) :
           (userData.map((user) => (
            <div className="col-3 my-2 " key={user.id}>
              <div className="card " >
                <img
                  src={user.fileurl}
                  className="rounded p-2"
                  height={350}
                  alt={user.name}
                />
                <div className="card-body">
                  <span>📅 {user.created.toDate().toDateString()}</span>
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text">{user.email}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                  <Link to = {`edit/${user.id}`}><button className="btn btn-secondary mx-2">Edit</button></Link>
                
                </div>
              </div>
            </div>
          ))
          
          )}
      </div>
    </div>
  );
};

export default Read;
