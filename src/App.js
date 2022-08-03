import React, { useState, useEFect, useEffect } from 'react'
import List from './components/List'
import Alert from './components/Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list) {
    return JSON.parse(localStorage.getItem('list'));
  }else {
    return [];
  }
}

function App() {
  /* COMPONENT ATTRIBUTE SET*/
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID,setEditID] =useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  //FORM ACTION METHOD
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      //DISPLAY ALERT
      showAlert(true,'danger','Please enter value');
    } else if (name && isEditing) {
      //DEAL WITH EDIT
      setList(list.map((item)=> {
        if(item.id === editID) {
          return {...item,title:name}
        }
        return item;
      }))
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true,'success','Item Updated..');
    } else {
      //SHOW ALERT
      showAlert(true,'success','Item added to the list.')
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName('');

    }
  }
  //SHOW ALERT METHOD
  const showAlert = (show=false,type='',msg='') => {
   setAlert({ show, type, msg })
  }
  //LIST CLEAR METHOD
  const clearList = () => {
    showAlert(true,'danger','Empty list');
    setList([]);
  }
  //REMOVE ITEM WITH ID
  const removeItem = (id) => {
    showAlert(true,'danger','Item Deleted')
    setList(list.filter((item)=> item.id !== id))
  }
  //EDIT ITEM WITH ID
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  //LOCALSTORAGE SET ITEM METHOD
  useEffect(()=> {
    localStorage.setItem('list',JSON.stringify(list))
  },[list])

  //COMPONENT RETURN REACT
  return (
    <section className="max-h-full bg-white rounded-lg shadow-lg mx-6 p-2 mt-20 min-w-min max-w-lg md:mx-auto">
      <div className='container h-96 my-auto mx-auto p-4'>
        <form className='grocery-form' onSubmit={handleSubmit}>

          {/* Alert components */}
          {alert.show && <Alert {...alert} removeAlert= {showAlert} list={list} />}

           {/* Form Component */}
          <h3 className='text-lg font-semibold text-center mb-2'>React todo App</h3>
          <div className="flex flex-row justify-center items-center">
            <input type="text" className='w-full rounded-md mx-1 p-1 bg-blue-100 text-md'
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder='Add to etc.' />
            <button type='submit' className='btn bg-blue-300 rounded-md p-1 text-sm md:text-md font-medium'>{isEditing ? 'Edit' : 'Submit'}</button>
          </div>

        </form>
        {/* IF LIST LENGTH > 0  THEN CLEAR BTN RETURNED */}
        {list.length > 0 && (
          <div className='mt-4'>
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button onClick={clearList} className='block justify-end text-red-600
             hover:text-red-300 text-sm md:text-md mx-auto'>
              Clear Items</button>
          </div>
        )}

      </div>
    </section>
  );
}

export default App;
