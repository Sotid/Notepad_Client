import React, {useState} from 'react'
import NotesList from '../Notes/notesList'
import Form from './Form'


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

         <div> <NotesList /></div>

          </div>

        // </div>
    )
}

export default Home;
