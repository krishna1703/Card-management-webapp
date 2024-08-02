import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { storage } from "../Firebase/firebaseConfig";
import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const Create = () => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputFileurl, setInputFileurl] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setIsEdit(false);
      
      setInputName("");
      setInputEmail("");
      setInputFileurl("");

    } else {
      setIsEdit(true);
      fetchsingledata();
    }
  }, [id]);

  const fetchsingledata = async () => {
    try {
      const docref = doc(db, "users", id);
      const docsnap = await getDoc(docref);

      setInputName(docsnap.data().name);
      setInputEmail(docsnap.data().email);
      setInputFileurl(docsnap.data().fileurl);
    } catch (error) {
      console.log(error);
    }
  };

const handleEdit = async (e)=>{
  e.preventDefault()
try {
  await  updateDoc(doc(db,"users" , id),{
    name: inputName,
    email: inputEmail,
    fileurl: inputFileurl,
  })
    
  setInputName("");
  setInputEmail("");
  setInputFileurl("");

  navigate("/")

} catch (error) {
  console.log(error)
}
   
}





  const handleUpload = async (e) => {
    let file = e.target.files[0];
    setIsloading(true);
    console.log(e.target.files);

    try {
      let imageRef = ref(storage, `images/${file.name}`);
      await uploadBytesResumable(imageRef, file);

      const url = await getDownloadURL(imageRef);

      setInputFileurl(url);
    } catch (error) {
      console.log(error);
    }
    setIsloading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    // Validate that all fields are not empty or undefined
    if (!inputName || !inputEmail || !inputFileurl) {
    
      return alert("please fill all  details")
    }

    const data = {
      _id: Date.now(), // Use Date.now() for unique ID
      name: inputName,
      email: inputEmail,
      fileurl: inputFileurl,
      created: Timestamp.now(),
    };

    const collectionRef = collection(db, "users");

    console.log("Form submit");
    try {
      await addDoc(collectionRef, data);
      navigate("/");
      console.log("Data added to Firebase");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="w-50 mx-auto mt-5">
      <h2>{isEdit ? "update a Card" : "Add a card"}</h2>
      {isloading && (
        <div className="alert alert-secondary mb-2 mt-2" role="alert">
          Wait, file is uploading
        </div>
      )}
      <form>
        <div className="mb-3">
          <label htmlFor="input_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="input_name"
            name="input_name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="input_email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="input_email"
            name="input_email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          {inputFileurl && (
            <div>
              <img  className="m-2 rounded" src={inputFileurl} alt={inputName} width={80} />
            </div>
          )}
          <label htmlFor="input_file" className="form-label">
        Upload file
          </label>

          <input
            type="file"
            className="form-control"
            id="input_file"
            name="input_file"
            onChange={handleUpload}
          />
        </div>
        {isEdit ? (<button type="submit"   className={`btn btn-secondary ${isloading ? "disabled" : ""}`}onClick={handleEdit}>
          Update
        </button>)
:
       ( <button type="submit"  className={`btn btn-primary ${isloading ? "disabled" : ""}`} onClick={handleAdd} >
          Add
        </button>)}
      </form>
    </div>
  );
};

export default Create;
