import React, { useState, useEffect } from "react";
import List from "./components/List";
import Alert from "./components/Alert";
import {
  collection,
  onSnapshot,
  query,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";


//LOCAL STORAGE APPLICATION CODES
// const getLocalStorage = () => {
//   let list = localStorage.getItem("list");
//   if (list) {
//     return JSON.parse(localStorage.getItem("list"));
//   } else {
//     return [];
//   }
// };

const style = {
  section: `max-h-full bg-white rounded-lg shadow-lg mx-6 p-2 mt-20 min-w-min max-w-lg md:mx-auto`,
  container: `container my-auto mx-auto p-4`,
  h3: `text-lg font-semibold text-center mb-2`,
  row: `flex flex-row justify-center items-center`,
  input: `'w-full rounded-md mx-1 p-1 bg-blue-100 text-md`,
  btnSubmit: `btn bg-blue-300 rounded-md p-1 text-sm md:text-md font-medium`,
  btnDelete: `block justify-end text-red-600 font-medium
  hover:text-red-300 text-sm md:text-md mx-auto`,
};

function App() {
  /* COMPONENT ATTRIBUTE SET*/
  const [name, setName] = useState("");
  //LOCALSTORAGE CODES
  // const [list, setList] = useState(getLocalStorage());
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  //FORM ACTION METHOD
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      //DISPLAY ALERT
      showAlert(true, "danger", "Please enter value");
    } else if (isEditing) {

      //DEAL WITH EDIT => local storage codes
      // setList(
      //   list.map((item) => {
      //     if (item.id === editID) {
      //       return { ...item, title: name };
      //     }
      //     return item;
      //   })
      // );
  
      await updateDoc(doc(db, "todos", editID), { text: name });
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Item Updated..");

    } else {
      //SHOW ALERT
      await addDoc(collection(db, "todos"), {
        text: name,
        completed: false,
      });
      showAlert(true, "success", "Item added to the list.");
      // const newItem = { id: new Date().getTime().toString(), title: name };
      // setList([...list, newItem]);
      setName("");
    }
  };
  //SHOW ALERT METHOD
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
    setTimeout(() => {
      showAlert(false, "", "");
    }, 3000)
  };
  //LIST CLEAR METHOD
  const clearList = () => {
    showAlert(true, "danger", "Empty list");
    setList([]);
  };
  //REMOVE ITEM WITH ID
  const removeItem = async (id) => {
    showAlert(true, "danger", "Item Deleted");
    // setList(list.filter((item) => item.id !== id));
    await deleteDoc(doc(db, "todos", id));
  };
  //EDIT ITEM WITH ID
  const editItem = async (item) => {
    setIsEditing(true);
    setEditID(item.id);
    setName(item.text);
  };
  //TOGGLE EVENT FOR CHECKBOX
  const toggleComplete = async (item) => {
    await updateDoc(doc(db, "todos", item.id), {
      completed: !item.completed,
    });
  };

  //LOCALSTORAGE SET ITEM METHOD
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setList(todosArr);
    });
    // localStorage.setItem('list',JSON.stringify(list))
  }, [list]);

  //COMPONENT RETURN REACT
  return (
    <section className={style.section}>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          {/* Alert components */}
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}

          {/* Form Component */}
          <h3 className={style.h3}>React todo App</h3>
          <div className={style.row}>
            <input
              type="text"
              className={style.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Add to etc."
            />
            <button type="submit" className={style.btnSubmit}>
              {isEditing ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
        {/* IF LIST LENGTH > 0  THEN CLEAR BTN RETURNED */}
        {list.length > 0 && (
          <div className="mt-4">
            <List
              items={list}
              removeItem={removeItem}
              editItem={editItem}
              toggleComplete={toggleComplete}
            />
            <button onClick={clearList} className={style.btnDelete}>
              Clear Items
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
