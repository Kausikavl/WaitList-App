import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function AdminView() {
   const navigate = useNavigate();
    function handleBack(){
       navigate('/admin');
    }
    const handleUpdate=async()=>{
      const id = sessionStorage.getItem('Updateemail')
      console.log(id);
        await axios.put(`http://localhost:5000/admin/update/:${id}`)
        .then((res)=>{
          if(res.status==200){
            toast.success(res.data.message)
            // toast.success()
          }
        })
    }
    

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-8">
      <form className="flex-1 p-6 bg-white shadow-md rounded-lg mb-8 md:mb-0 md:mr-8">
        <h1 className="text-2xl font-bold mb-6">Edit Details</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
          ></input>
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={handleUpdate}
          >
            Update
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </form>
      <div className="flex-1 flex justify-center items-center">
        <img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2Fimg&psig=AOvVaw1eUSQQ7FxMALvm6rygPT8M&ust=1720763960664000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDroLinnocDFQAAAAAdAAAAABAE' alt="img" className="w-full h-auto " />
      </div>
      {/* <ToastContainer
        position='bottom-center' 
        autoClose={2000}
        theme='dark'
      /> */}
    </div>
  );
}

export default AdminView;
