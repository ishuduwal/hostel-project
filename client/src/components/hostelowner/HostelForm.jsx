import React, { useState } from 'react'
import PopUpMap from './PopUpMap';
import { AddHostel, getVerifiedHostel } from '../../function/Hostel';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function HostelForm({ formToggler, setHostel, hostel }) {

    const dispatch = useDispatch();
    const storage = useSelector((state) => state);
    const [isMap, setIsMap] = useState(false);
    const [floorNum, setFloorNum] = useState(1);

    const mapToggler = () => {
        setIsMap(!isMap);
    }

    const floorHandler = (i, floorName) => {
        setHostel({ ...hostel, floor: { ...hostel.floor, [i]: { ...hostel.floor?.[i], [floorName]: { price: "", isTrue: !hostel.floor?.[i]?.[floorName]?.isTrue } } } })
    }

    const addHostelHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", +hostel._id);
        formData.append("title", hostel.title);
        formData.append("description", hostel.description);
        formData.append("price", hostel.price);
        formData.append("location", hostel.location);
        formData.append("sex", hostel.sex);
        formData.append("floor", JSON.stringify(hostel.floor));
        formData.append("email", storage.user.email);
        formData.append("latlng", JSON.stringify(hostel.latlng));

        if (hostel.image) {
            [...Array(hostel.image.length)].map((e, i) => {
                formData.append("image", hostel.image[i]);
            })

            formData.append("imagepath1", hostel.imagepath1);
            formData.append("imagepath2", hostel.imagepath2);
            formData.append("imagepath3", hostel.imagepath3);

        }
        console.log(hostel)
        const res = await AddHostel(formData);
        if (!res.success) return toast.error(res.message);
        formToggler();
        toast.success(res.message);
        setHostel({ _id: "", title: "", description: "", image: [], location: "", sex: "Boys" });
    }

    return (
        <div className='hostel-form-bg' >
            <div className='hostel-form'>
                <div className='top-section'>
                    <div >
                        <div>
                            <label>Hostel Name</label>
                            <input type='text' className='form-control ' value={hostel.title} onChange={(e) => setHostel({ ...hostel, title: e.target.value })} />
                        </div>
                        <div>
                            <label>Sex</label>
                            <select onChange={(e) => setHostel({ ...hostel, sex: e.target.value })} className='form-control' >
                                <option value="Boys">Boys</option>
                                <option value="Girls">Girls</option>
                            </select>
                        </div>
                        <div>
                            <label>Image 1</label>
                            <input type='file' className='form-control' onChange={(e) => setHostel({ ...hostel, image: [...hostel.image, e.target.files[0]], imagepath1: e.target.files[0].name })} />
                        </div>
                        <div>
                            <label>Image 2</label>
                            <input type='file' className='form-control' onChange={(e) => setHostel({ ...hostel, image: [...hostel.image, e.target.files[0]], imagepath2: e.target.files[0].name })} />
                        </div>

                        <div>
                            <label>Image 3</label>
                            <input type='file' className='form-control' onChange={(e) => setHostel({ ...hostel, image: [...hostel.image, e.target.files[0]], imagepath3: e.target.files[0].name })} />
                        </div>
                        <div>
                            <label>Location</label>
                            <div>
                                <button onClick={() => mapToggler()} className='btn btn-light' >{hostel.location ? hostel.location.split(",").slice(0, -2).join(",") : "Choose Location"}</button>
                            </div>
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea value={hostel.description} className='form-control' cols="110" onChange={(e) => setHostel({ ...hostel, description: e.target.value })} />
                        </div>
                    </div>
                    <div className='overflow-y-scroll overflow-x-hidden' >
                        {[...Array(floorNum)].map((a, i) => (
                            <container className=' py-2 ' key={i} >
                                <label className=' w-100 text-center my-2'>Floor {i + 1}</label>
                                <div className='d-flex flex-row justify-content-between ' >
                                    <button className={`me-1 w-25 btn ${hostel.floor && hostel.floor[i] && hostel.floor[i]["one"]?.isTrue ? "btn-success" : "btn-light"}`} onClick={() => floorHandler(i, "one")} >1 Seater</button>
                                    <button className={`me-1 w-25 btn ${hostel.floor && hostel.floor[i] && hostel.floor[i]["two"]?.isTrue ? "btn-success" : "btn-light"}`} onClick={() => floorHandler(i, "two")}>2 Seater</button>
                                    <button className={`me-1 w-25 btn ${hostel.floor && hostel.floor[i] && hostel.floor[i]["three"]?.isTrue ? "btn-success" : "btn-light"}`} onClick={() => floorHandler(i, "three")}>3 Seater</button>
                                    <button className={`me-1 w-25 btn ${hostel.floor && hostel.floor[i] && hostel.floor[i]["four"]?.isTrue ? "btn-success" : "btn-light"}`} onClick={() => floorHandler(i, "four")}>4 Seater</button>
                                </div>

                                <div className='d-flex flex-row justify-content-between mt-2 '>
                                    <input type='number' placeholder='price' className='mx-1 w-25 form-control' value={hostel.floor && hostel.floor[i] && hostel.floor[i]["one"]?.price} onChange={(e) => setHostel({ ...hostel, floor: { ...hostel.floor, [i]: { ...hostel.floor?.[i], ["one"]: { ...hostel.floor?.[i]?.["one"], price: e.target.value } } } })} disabled={hostel.floor && hostel.floor[i] && hostel.floor[i]["one"]?.isTrue ? false : true} ></input>
                                    <input type='number' placeholder='price' className='mx-1 w-25 form-control' value={hostel.floor && hostel.floor[i] && hostel.floor[i]["two"]?.price} onChange={(e) => setHostel({ ...hostel, floor: { ...hostel.floor, [i]: { ...hostel.floor?.[i], ["two"]: { ...hostel.floor[i]["two"], price: e.target.value } } } })} disabled={hostel.floor && hostel.floor[i] && hostel.floor[i]["two"]?.isTrue ? false : true}></input>
                                    <input type='number' placeholder='price' className='mx-1 w-25 form-control' value={hostel.floor && hostel.floor[i] && hostel.floor[i]["three"]?.price} onChange={(e) => setHostel({ ...hostel, floor: { ...hostel.floor, [i]: { ...hostel.floor?.[i], ["three"]: { ...hostel.floor[i]["three"], price: e.target.value } } } })} disabled={hostel.floor && hostel.floor[i] && hostel.floor[i]["three"]?.isTrue ? false : true} ></input>
                                    <input type='number' placeholder='price' className='mx-1 w-25 form-control' value={hostel.floor && hostel.floor[i] && hostel.floor[i]["four"]?.price} onChange={(e) => setHostel({ ...hostel, floor: { ...hostel.floor, [i]: { ...hostel.floor?.[i], ["four"]: { ...hostel.floor[i]["four"], price: e.target.value } } } })} disabled={hostel.floor && hostel.floor[i] && hostel.floor[i]["four"]?.isTrue ? false : true} ></input>
                                </div>
                            </container>
                        ))}
                        {floorNum > 4 ? "" : <button className='d-block m-auto my-2 btn btn-primary' onClick={() => setFloorNum(floorNum + 1)} >Next Floor</button>}
                    </div>
                </div>
                <div className='bottom-section'>
                    <button onClick={(e) => addHostelHandler(e)} >Create</button>
                </div>
                <span onClick={() => formToggler()} >
                    &times;
                </span>
                {isMap ? <PopUpMap mapToggler={mapToggler} setHostel={setHostel} /> : ""}
            </div >
        </div >
    )
}

export default HostelForm