import axios from "axios";
const URL = "http://localhost:5000/hostel"

const header = {
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'include'
}

export const GetVerifiedHostel = () => axios.get(URL + "/verified", header);
export const GetUnverifiedHostel = () => axios.get(URL + "/unverified", header);
export const AddHostel = (hostel) => axios.post(`${URL}/addhostel`, hostel, header);
export const ApproveHostel = (hostel) => axios.patch(`${URL}/${hostel._id}`, hostel, header);
export const DeleteHostel = (_id) => axios.delete(`${URL}/${_id}`, header);
export const GetHostel = (email) => axios.post(URL, email, header);
export const FilterHostel = (filter) => axios.post(`${URL}/filter`, filter, header)