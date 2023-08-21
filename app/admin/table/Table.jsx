'use client'
import React, {  useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import formatTimestampToDate from '../func/GenerateTimestamp'
import createData from '../func/createData'
import ButtonGroups from './comp/ButtonGroup'
import { useLoadContext } from '../../state/Context';
export default function OrderTable({data}) {
const {order,users,webinars}=data;
const {load,setLoad}=useLoadContext();
  const columns = [
    { id: 'id', label: 'Order ID', },
    ,
  {
    id: 'webinar_id',
    label: 'Course Id',
 
  
  },{
    id: 'user_id',
    label: 'Buyer ID',
 
  
  },
    
      { id: 'name', label: 'Courses'},
  { id: 'fullName', label: 'Name' },
  {
    id: 'email',
    label: 'Email',
    

  },
  {
    id: 'date',
    label: 'Ordered Date',

  
  },
  {
    id: 'amount',
    label: 'Total Amount (USD)',
 
    format: (value) => value.toFixed(2),
  }, {
    id: 'actions',
    label: 'action',
 
    format: (value) => value.toFixed(2),
  },
];

  
const frows = [];


order?.forEach((order) => {
  const date = formatTimestampToDate(order.created_at);
  const user = users.find(user => user.id === order.user_id); // Replace this with your user retrieval logic
  const webinar = webinars.find(webinar => webinar.id === order.webinar_id);

  const existingRow = frows.find(row => row.user_id === order.user_id && row.created_at === date);

 if (existingRow) {
    existingRow.webinar_slugs.push(webinar?.slug || "");
    existingRow.amount += webinar?.price || 0;

      existingRow.webinar_id.push(order.webinar_id) 
   // Add owner_id to the array
  } else {
    frows.push({
      id: order.id,
       webinar_id: [order.webinar_id],
      user_id: order.user_id,
     // Initialize owner_ids array
      full_name: user?.full_name,
      email: user?.email,
      webinar_slugs: [webinar?.slug || ""],
      created_at: date,
      amount: webinar?.price || 0
    });
  }
});
const rows = frows.map(row => {
  return createData(
    row.id,
    row.webinar_id.join(", "),
    row.user_id,
     
    row.full_name,
    row.email,
 
    row.webinar_slugs.join(", "), // Joining webinar slugs with a comma and space
    row.created_at,
    row.amount
    
  );
});




  const [page, setPage] =useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden',marginTop:'10vh' }}>
      <TableContainer sx={{ maxHeight:'80vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>

              {columns.map((column) => (
                <TableCell
                  key={column.id}
                      align='center'
                      
                      style={{ minWidth: '150px' }}
                      className='text-2xl'
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 && (
              <h1 className='text-center'>There is no order at this time!</h1>
            )}
              {rows
        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
              {columns.map((column) => {
                const value = row[column.id];

                if (column.id === 'actions') {
                  return (
                    <TableCell key={column.id} align="center" className=' min-w-[20vw]'>
                      <ButtonGroups row={row} setLoad={setLoad} /></TableCell>
              
                  );
                }

                return (
                  <TableCell key={column.id} align="center">
                    {column.format && typeof value === 'number'
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
          
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}