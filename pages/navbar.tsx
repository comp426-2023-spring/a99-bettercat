import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import User from '@/models/User';
import { initFirebase } from "@/firebase/clientApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import unc from "public/unc.png"

const auth = getAuth();

// interface navBarProps {
//   user_id: String | null;
// }
// { user_id }:navBarProps
export default function NavBar(){
    var user_id = auth.currentUser?.uid
    const width = findWidth()
    console.log(width)
    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-30 items-center">    
        { 
          width >= 800 ?
            <div className="flex items-center justify-center flex-row"> {/*logo container*/}    
                <a className="text-xl font-semibold px-20" href="/">
                  <Image
                    src ={unc}
                    height={150}
                    width={150}
                    alt = "Unc" 
                  />
                  </a>
                  <div className="flex flex-row ml-4 space-x-20">
                  <a className="text-xl text-blue-300 font-medium my-4" href="/restaurants">View All</a>
                  { user_id && (
                    <div className="text-xl text-blue-300 font-medium my-4 space-x-20">
                      <a href={"/users/" + user_id} >My Profile</a>
                      <button onClick={() => auth.signOut()}>Sign out</button>
                    </div>
                    
                  )}
                  </div>
            </div>   
          :
          <div className="flex items-center justify-center flex-col"> {/*logo container*/}    
                  <a className="text-xl font-semibold px-20" href="/">
                    <Image
                      src ={unc}
                      height={150}
                      width={150}
                      alt = "Unc" 
                    />
                    </a>
  
                  <div className="flex flex-row ml-4 space-x-10">
                    <a className="text-xl text-blue-300 font-medium my-4" href="/restaurants">View All</a>
                    { user_id && (
                      <div className="text-xl text-blue-300 font-medium my-4 space-x-10">
                        <a href={"/users/" + user_id} >My Profile</a>
                        <button onClick={() => auth.signOut()}>Sign out</button>
                      </div>)}
                  </div> 
              </div>
        }
      </nav>
    );
}  

const findWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);
  return width;
};

  