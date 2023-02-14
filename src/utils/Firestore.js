// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs } from'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyDJbvcK-798BZ0CgRfjwHKIIZ2kiAbUl3o",
  authDomain: "practice-log-38d8d.firebaseapp.com",
  databaseURL: "https://practice-log-38d8d-default-rtdb.firebaseio.com",
  projectId: "practice-log-38d8d",
  storageBucket: "practice-log-38d8d.appspot.com",
  messagingSenderId: "839893580394",
  appId: "1:839893580394:web:2be8205fc3ec641daae813",
  measurementId: "G-CYCLHKL5PW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)
// let userData = []
// const querySnapshot = getDocs(collection(db, 'userData'))
// .then((snapshot) => {
//     snapshot.docs.forEach((doc)=>{
//         userData.push({...doc.data(),id: doc.id})
//     })
//     console.log(userData[0].timeStamp.toDate().getDay())
// })




let year = new Date().getFullYear()
let month = new Date().getMonth()
let day = new Date().getDate()




 export const getDailyPractices = async()=>{
    const response = await getDocs(collection(db, 'userData'))
    let data  = response.docs.map(doc =>{
        return doc.data()
    })
    
    
    .filter((doc)=>{
        return(
            doc.timeStamp.toDate().getFullYear() === year &&
            doc.timeStamp.toDate().getMonth()=== month &&
            doc.timeStamp.toDate().getDate()=== day
        )
    })
    return data

}

export async function getDailyPracticeMinutes(promise){
    let res = await promise
    res = res.map(ele => ele.practices[0].minutesPracticed).reduce((a, b)=> a + b, 0)
    return res
    
}









 





