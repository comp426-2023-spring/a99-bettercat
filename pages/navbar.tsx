import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';


export default function navBar(){
    const [navbar, setNavbar] = useState(false);

    return (
        <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
          <div className="flex items-center justify-center filter drop-shadow-md h-20"> {/*logo container*/}
                <a className="text-xl font-semibold" href="/">Chapel Hill Restaurants</a>
                <div className="flex flex-col ml-4">
                  <a className="text-xl font-medium my-4" href="/restaurants">View All</a>
                </div>
            </div>
        </nav>
      );
}