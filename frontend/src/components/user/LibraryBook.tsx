import axios from 'axios'
import React from 'react'
import useUserContext from '../../hooks/useUserContext'
import useLoansContext from '../../hooks/useLoansContext'
import LoginAlert from './alerts/LoginAlert'
import SuccessAlert from './alerts/SuccessfullyBorrowedAlert'
import AlreadyBorrowedAlert from './alerts/AlreadyBorrowedAlert'
import { IBook } from '../../interfaces'

// credit https://preline.co/examples.html

interface Props {
  book: IBook
}

const LibraryBook = ({book}: Props) => {

  const [loginAlertOpen, setLoginAlertOpen] = React.useState(false);
  const [alradyBorrowedAlertOpen, setAlreadyBorrowedAlertOpen] = React.useState(false);
  const [successfullyBorrowedAlertOpen, setSuccessfullyBorrowedAlertOpen] = React.useState(false);

  const {user} = useUserContext()
  const {loans, dispatch} = useLoansContext()
 
  const handleClick = async () => {
    if(!user) {
      return setLoginAlertOpen(true)
    }

    const alreadyBorrowed = loans.find(loan => loan.bookID._id === book._id)

    if(alreadyBorrowed) {
      return setAlreadyBorrowedAlertOpen(true)
    }

    const headers = { 
      headers: { 
        "Authorization": `Bearer ${user.token}`
      }
    };

    try{
      // check if already on loan
      const response = await axios.post('https://mern-library-app-backend.onrender.com/api/members', {bookID: book._id }, headers )
      dispatch({type:'ADD_LOAN', payload: response.data})
      setSuccessfullyBorrowedAlertOpen(true)
    }catch(error) {
      if (axios.isAxiosError(error)) {
        alert(error.message)
      }
    }
  }

  return (
    <>

      <div className="flex  border shadow-sm rounded-xl bg-gray-800 border-gray-700 shadow-slate-700/[.7] ">
        <div className='w-1/4 mr-2'>
          <img className="  object-scale-down h-52 mt-6 ml-4" src={`https://mern-library-app-backend.onrender.com/${book.cover}`}  alt="Image Description"/>
        </div>

        <div className="p-4 md:p-5 w-3/4">
          <h3 className="text-lg font-bold  text-white">
          {book.title}
          </h3>
          <p className="text-base mt-1 text-white">
          {book.author}
          </p>
          <p className="mt-1 text-gray-400">
          {book.summary}
          </p>
          <button className="mt-3 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800" onClick={handleClick}>
          Borrow
          </button>

          <LoginAlert loginAlertOpen={loginAlertOpen} setLoginAlertOpen={setLoginAlertOpen}/>
          <SuccessAlert successfullyBorrowedAlertOpen={successfullyBorrowedAlertOpen} setSuccessfullyBorrowedAlertOpen={setSuccessfullyBorrowedAlertOpen}/>
          <AlreadyBorrowedAlert alradyBorrowedAlertOpen={alradyBorrowedAlertOpen} setAlreadyBorrowedAlertOpen={setAlreadyBorrowedAlertOpen} />

        </div>
      </div>

    </>
    
  )
}

export default LibraryBook 
