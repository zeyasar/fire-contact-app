import './App.css';
import FormComponent from './components/form/FormComponent';
import Contacts from "./components/contacts/Contacts"
import { useState } from 'react';
import { addUser, EditUser } from './utils/functions';
import { ToastContainer } from 'react-toastify';

const initialValues={username:'', phoneNumber:'', gender:''}

function App() {

  const [info, setInfo] = useState(initialValues)

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(info.id){
      EditUser(info)
    }else{
    addUser(info)
    }
    setInfo(initialValues)
  }

  const editHandler = (id, username, phoneNumber, gender) => {
    setInfo({id, username, phoneNumber, gender})

  }

  return (
    <div className="App">
      <FormComponent info={info} setInfo={setInfo} handleFormSubmit={handleFormSubmit} />
      <Contacts editHandler={editHandler}/>
      <ToastContainer/>
    </div>
  );
}

export default App;
