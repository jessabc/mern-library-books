import * as React from 'react';
import { DataGrid, GridCellParams, GridColDef, GridTreeNode } from '@mui/x-data-grid';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import addMinutes from 'date-fns/addMinutes'
import SuccessfullyReturnedAlert from './alerts/SuccessfullyReturnedAlert';
import SuccessfullyRenewedAlert from './alerts/SuccessfullyRenewedAlert';
import axios from 'axios';
import useUserContext from '../../hooks/useUserContext'
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';
import Tooltip from '@mui/material/Tooltip';
import { IUserLoan } from '../../interfaces';
import useLoansContext from '../../hooks/useLoansContext';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Title', width: 250 },
  { field: 'author', headerName: 'Author', width: 200 },
  { field: 'borrowed', headerName: 'Borrowed/Reborrowed', width: 200 },
  { field: 'expires', headerName: 'Expires', width: 200 },
  { field: 'renew', headerName: 'Renew', width: 100,  sortable: false, renderCell: () => {
    return (
        <button className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }} >
           <Tooltip title="Renew for two minutes">
              <HistoryOutlinedIcon />
           </Tooltip>
         </button>
    );
 } },

  { field: 'return', headerName: 'Return', width: 100,  sortable: false, renderCell: () => {
    return (
        <button className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }} >
            <KeyboardReturnOutlinedIcon />
         </button>
    );
 } },
];

interface Props {
  loans: IUserLoan[],

}
 

export default function LoansDataTable({loans}: Props) {

    const [successfullyReturnedAlertOpen, setSuccessfullyReturnedAlertOpen] = React.useState(false);
    const [successfullyRenewedAlertOpen, setSuccessfullyRenewedAlertOpen] = React.useState(false);

    const {user} = useUserContext()
    const {dispatch} = useLoansContext()

    const rows = loans.map((book: IUserLoan) => {
        return {
          id: book._id, title: book.bookID.title, author: book.bookID.author , borrowed: new Date(book.expireAt).toString().split('G')[0], expires: addMinutes(new Date(book.expireAt), 2).toString().split('G')[0], renew: 'renew', return: 'return'
         }
    })

    const handleOnCellClick = (e: GridCellParams<any, unknown, unknown, GridTreeNode>) => {
      if(e.formattedValue === 'renew') {
          renewBook((e.id).toString())
      } else if(e.formattedValue === 'return') {
          returnBook((e.id).toString())
      }
    }

    const returnBook = async (id:string) => {
      const headers = { 
        headers: { 
          "Authorization": `Bearer ${user?.token}`
        }
      };

      try{
        await axios.delete(`https://mern-library-app-backend.onrender.com/api/members/loans/${id}`, headers)
        setSuccessfullyReturnedAlertOpen(true)
        setTimeout(() => {
          const updatedLoans = loans.filter((loan: IUserLoan) => loan._id != id)
        dispatch({type:'SET_LOANS', payload: updatedLoans})
        }, 1000);
      }catch(error) {
        if (axios.isAxiosError(error)) {
          alert(error.message)
        }
      } 
  }
    
  const renewBook = async (id:string) => {
    const headers = { 
      headers: { 
        "Authorization": `Bearer ${user?.token}`
      }
    };
  
    try{
      const response = await axios.patch(`https://mern-library-app-backend.onrender.com/api/members/loans/${id}`, {}, headers)
      const updatedLoans = loans.map((loan: IUserLoan) => loan._id === id? {...response.data} :  loan)
      dispatch({type:'SET_LOANS', payload: updatedLoans})
      setSuccessfullyRenewedAlertOpen(true)
    }catch(error) {
      if (axios.isAxiosError(error)) {
        alert(error.message)
      }
    }
  }


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellClick={(e) => handleOnCellClick(e)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
          columns: {
            columnVisibilityModel: {
                id: false
            }
          }
        }}
        pageSizeOptions={[5, 10]}
      />

      <SuccessfullyReturnedAlert successfullyReturnedAlertOpen={successfullyReturnedAlertOpen} setSuccessfullyReturnedAlertOpen={setSuccessfullyReturnedAlertOpen}/>

      <SuccessfullyRenewedAlert successfullyRenewedAlertOpen={successfullyRenewedAlertOpen} setSuccessfullyRenewedAlertOpen={setSuccessfullyRenewedAlertOpen}/>
      
    </div>
  );
}
