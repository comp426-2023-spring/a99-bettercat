import Link from "next/link";
import { useState } from "react";


export default function Example() {

    let value = "value";
    const li = [1,2,3,4];

    //let i = 0;
    const [/* State variable */ i, /* Updating function */ setI] = useState(/* Initial value */ 0);

    return(
        <div>
            <p>Hello!</p>
            <p>This is a {value} in a HTML element</p>
            
            {/* This is a comment */}
            
            {/* This is a loop over the items */}
            { li.map((element) => 
                <p>This is an {element}</p>
            )}

            <Link href={"/"}>This is a link</Link>

            <p className=" text-center font-bold">This is some styled text!</p>

            {/* This is a state: */}

            <p>{i}</p>
            <button onClick={increment}>
                Increase Number
            </button>
        </div>
    );

    function increment() {
        setI(i + 1);
    }
}