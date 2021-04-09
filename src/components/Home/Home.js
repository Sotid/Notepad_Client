import React, {useState} from 'react'
import NotesList from '../Notes/notesList'


const Home = () => {
    const [notes,setNotes] = useState([])
    const [selectedPokemon, setSelectedPokemon] = useState()


    const addNotes = (note) => {
        setNotes((notes) => [...notes, note])
    }
    return (
        <div>
           {/* <div className="container"> */}
         <div > 

         </div> 

          <NotesList />
          </div>

        // </div>
    )
}

export default Home;
