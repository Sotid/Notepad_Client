import React, {useState} from 'react'
import Form from "../components/Home/Form"

const Navbar = () => {
    
    const [visible, setVisible] = useState(false);


    return (
      <div>
      <button onClick={() => setVisible(!visible)}>
         {!visible ? "Add Note" : ">"}
      </button>
      {visible && <p><Form /></p>}
        

    
        </div>
    )
}

export default Navbar;
