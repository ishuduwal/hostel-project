import React, { useEffect, useState } from 'react'
import { DeleteHostel, approveHostel, getUnverifiedHostel } from '../../function/Hostel';
import { toast } from 'react-toastify';

function ApproveHostel() {

    const [hostels, setHostels] = useState([]);
    const [hostel, setHostel] = useState({});

    const getHostels = async () => {
        const res = await getUnverifiedHostel();
        setHostels(res);
        console.log(res)
    }

    const verifyHostelHandler = async (_id, status) => {
        const res = await approveHostel({ _id, isApprove: status });
        if (!res.success) {
            toast.error(res)
            return;
        }
        getHostels();
    }

    useEffect(() => {
        getHostels();
    }, [])

    return (
        <div className='approve-hostel'>
            <table>
                <tr className='manage-title'>
                    <th>S.N</th>
                    <th>Hostel Name</th>
                    <th>Hostel Owner</th>
                    <th>Created at</th>
                    <th>Action</th>
                </tr>
                {
                    hostels.length > 0 && hostels.map((hostel, index) => (
                        <tr className='user-info' key={index}>
                            <td>{index + 1}</td>
                            <td>{hostel.title}</td>
                            <td>{hostel.email}</td>
                            <td>{hostel.createdAt.slice(0, 10)}</td>
                            <td className='edit-delete'>
                                <button className='verify' onClick={() => verifyHostelHandler(hostel._id, "Approved")} >Verify</button>
                                <button className='delete' onClick={() => verifyHostelHandler(hostel._id, "Denied")} >Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default ApproveHostel