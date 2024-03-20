import React from 'react'
import { useState, useEffect } from 'react';
import { getHostel, DeleteHostel } from '../../function/Hostel';
import './Owner.scss';
import HostelForm from './HostelForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Owner = () => {

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [isForm, setIsForm] = useState(false);
  const [hostels, setHostels] = useState([]);
  const [hostel, setHostel] = useState({ _id: "", title: "", description: "", room: {}, image: [], location: "", sex: "Boys" });

  const formToggler = () => {
    setHostel({ _id: "", title: "", description: "", room: {}, image: [], location: "", sex: "Boys" });
    setIsForm(!isForm);
  };

  const FetchHostel = async () => {
    const res = await getHostel({ email: user.email });
    setHostels(res);
  }

  const deleteHostel = async (id) => {
    const res = await DeleteHostel(id);
    FetchHostel();
  }

  const editHostel = (hostel) => {
    setHostel(hostel);
    formToggler();
  }

  useEffect(() => {
    FetchHostel();
  }, [isForm]);

  return (
    <>
      <div className='hostel-owner'>
        <div className='owner-dashboard'>
          <div>
            <p>Hostel Managament</p>
          </div>
          <div>
            <button onClick={() => formToggler()}>Add Hostel</button>
          </div>
        </div>
        <div className='hostel-info'>
          <table className='table' >
            <thead>
              <tr className='table-title text-center'>
                <th>S.N</th>
                <th>Hostel Name</th>
                <th>Description</th>
                <th>Sex</th>
                <th>Location</th>
                <th>Created Date</th>
                <th>Approval</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {hostels.length > 0 && hostels.map((hostel, index) => (
                <tr key={index} className='table-data'>
                  <td>{index + 1}</td>
                  <td>{hostel.title}</td>
                  <td className='description-cell'>{hostel.description}</td>
                  <td>{hostel.sex}</td>
                  <td>{hostel.location}</td>
                  <td>{hostel.createdAt.slice(0, 10)}</td>
                  <td>{hostel.isApprove}</td>
                  <tr>
                    <td>
                      <button onClick={() => editHostel(hostel)}>Edit</button>
                      <button onClick={() => deleteHostel(hostel._id)} >Delete</button>
                    </td>
                  </tr>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isForm && <HostelForm formToggler={formToggler} hostel={hostel} setHostel={setHostel} />}
      </div>
    </>
  )
}
