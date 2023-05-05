import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import User from '@/models/User';
import { auth, initFirebase } from "@/firebase/clientApp";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import unc from "public/unc.png"

// interface navBarProps {
//   user_id: String | null;
// }
// { user_id }:navBarProps
export default function NavBar(){
    var user_id = auth.currentUser?.uid
    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-30 w-full">    
            <div className="flex items-center justify-center w-full"> {/*logo container*/}    
                <Link className="text-xl font-semibold px-20" href="/">
                  <Image
                    src ={unc}
                    height={150}
                    width={150}
                    alt = "Unc" 
                  />
                  </Link>
                  <div className="flex flex-row ml-4 space-x-20">
                  <Link className="text-xl text-blue-300 font-medium my-4" href="/restaurants">View All</Link>
                  { user_id && (
                    <div className="text-xl text-blue-300 font-medium my-4 space-x-20">
                      <Link href={"/users/" + user_id} >My Profile</Link>
                      <button onClick={() => auth.signOut()}>Sign out</button>
                    </div>
                    
                  )}
                  </div>
            </div>   
      </nav>
    );
}  

// const findWidth = () => {
//   const [width, setWidth] = useState(window.innerWidth);
//   const handleResize = () => setWidth(window.innerWidth);
//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, [width]);
//   return width;
// };

  