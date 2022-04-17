// eslint-disable-next-line
import firebase from "./firebase"
import { getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";
import { useEffect, useState } from 'react';
import Toastify from "./toast";



export const addUser=(info)=>{
    const db = getDatabase();
    const userRef=ref(db,"contactInfo");
    const newUserRef=push(userRef)
    set((newUserRef),{
        username:info.username,
        phoneNumber:info.phoneNumber,
        gender:info.gender,
    })
}

export const useFetch = () => {
    const [isLoading, setIsLoading] = useState();
    const [contactList, setContactList] = useState();

    useEffect(() => {
        setIsLoading(true);
        const db = getDatabase();
        const userRef=ref(db,"contactInfo");

       onValue(userRef, (snapshot) => {
           const data = snapshot.val();
           const contactInfoArray = [];

           for(let id in data){
               contactInfoArray.push({id,...data[id]})
           }
           setContactList(contactInfoArray);
           setIsLoading(false)
       })
    }, [])
    return {isLoading, contactList}
}

export const DeleteUser = (id) => {
    const db = getDatabase();
    remove(ref(db,"contactInfo/"+id))
    Toastify("User information deleted.")
}

export const EditUser=(info)=>{
    const db = getDatabase();
    const updates = {};

    updates["contactInfo/"+info.id]=info;
    return update(ref(db),updates);

}
