import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Admin() {
    const navigate = useNavigate();
    const [data,setdata]=useState([])
    const [bool,setbool]=useState(true)
    const fetchdata = async()=>{
        try {
            const response = await axios.get('http://localhost:5000/admin/getall');
            const filterdata  = response.data[0].filter(item=> item.name!=null)
            setdata(filterdata)
          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error here if needed
          }
    }
    useEffect(()=>{
        fetchdata();
    },[])
    function handleView(row){
        sessionStorage.setItem("Updateemail",row)
        setTimeout(()=>navigate('/adminView'),)
    }
    const handleDelete=async(row)=>{
        await axios.delete(`http://localhost:5000/admin/delete/${row}`)
        .then((res)=>{
            if(res.status==200){
                toast.success(res.data.message)
                fetchdata()
            }
            else{
                toast.error("Deletion is not done")
            }
        })
    }



    return (
        <div className="min-h-screen p-8 ">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Status Checking</h1>
            <div className="overflow-x-auto">
                <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full bg-white">
                        <thead className=" bg-gray-300">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Index</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Position</th>
                                {/* <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th> */}
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Edit</th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((row,index) => (
                                <tr key={row._id} className="hover:bg-gray-100">
                                    <td className="px-4 py-4 whitespace-nowrap">{index+1}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{row.name}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{row.email}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{row.position}</td>
                                    {/* <td className="px-4 py-4 whitespace-nowrap">{row.service.join(", ")}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{row.status}</td> */}
                                    <td className="px-4 py-4 whitespace-nowrap ">
                                        <button
                                            className="bg-blue-500 w-18 text-white py-2 px-6 rounded shadow hover:bg-blue-600"
                                            onClick={()=> handleView(row.email)}
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap ">
                                        <button
                                            className="bg-blue-500 w-18 text-white py-2 px-6 rounded shadow hover:bg-blue-600"
                                            onClick={()=> handleDelete(row.email)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default Admin;