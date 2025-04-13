import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useState } from 'react'
import { removeFromPastes } from '../redux/pasteSlice';
import toast, {Toaster} from 'react-hot-toast';


const Paste = () => {
  const pastes=useSelector((state)=>state.paste.pastes);
  const[searchTerm,setsearchTerm]= useState('');
  const dispatch = useDispatch();
  const filteredPastes = pastes.filter(paste => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  return (
    <div>
      <input 
       className='p-2 rounded-2xl min-w-[600px] mt-5' type='search'
       placeholder='Search for a paste'
       value={searchTerm}
       onChange={(e)=>setsearchTerm(e.target.value)}
      />
       <div className='flex flex-col gap-5'>
          {
            filteredPastes.length > 0 && 
            filteredPastes.map((paste) => {
              return (
              <div className='border' key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className='flex flex-row gap-4 place-content-evenly'>
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                    </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>View</a>
                    </button>
                  <button onClick={() => handleDelete(paste?._id)}>Delete</button>
                  <button onClick={()=>{
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("copied to clipboard");
                    }}
                    >Copy</button>
                  
                </div>
                <div>{paste.createdAt}</div>
              </div>
            );
          })}
       </div>
    </div>         
  )
}
 


export default Paste
