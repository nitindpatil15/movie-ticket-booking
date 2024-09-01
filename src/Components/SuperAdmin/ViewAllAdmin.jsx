import React from 'react';
import './ViewAllAdmin.css';

export const ViewAllAdmin = () => {
  return (
    <>
    <div className="container">
    <div className="header">
           <div className="text">View All Admin</div>
           </div>
    <table class="table table-striped table-hover">
       
    <thead>
      <tr>
        <th> Admin Name</th>
        <th>Email</th>
        <th>Contact</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Shubham Sandanshiv</td>
        <td>ssandanshiv05@gmail.com</td>
        <td>97026 99840</td>

        <td>
            <button class="btn-1"><i class="fa fa-pencil-square-o"></i> Update</button>
            <button class="btn-2"><i class="fa fa-home"></i> Delete</button></td>
      </tr>
      <tr>
        <td>Example Name </td>
        <td>Example@gmail.com</td>
        <td>00000 00000</td>

        <td>
            <button class="btn-1"><i class="fa fa-pencil-square-o"></i> Update</button>
            <button class="btn-2"><i class="fa fa-home"></i> Delete</button></td>
      </tr>
    
    </tbody>
  </table>
  </div></>
  )
}
export default ViewAllAdmin
