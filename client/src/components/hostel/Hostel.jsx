import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../../assets/carousel/one.jpg'
import './Hosteldetail.scss';
import { FilterHostel, getVerifiedHostel } from '../../function/Hostel';
import { useDispatch } from 'react-redux';
import { selectHostel } from '../../redux/Index';
import StarIcon from '@mui/icons-material/Star';

export const Hostel = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [hostels, setHostels] = useState([]);
    const [filter, setFilter] = useState({ price: 0 });
    const [hoverStar, setHoverStar] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const getHostels = async () => {
        const res = await getVerifiedHostel();
        setHostels(res);
    }

    const seeMoreHandler = (e, hostel) => {
        e.preventDefault();
        dispatch(selectHostel({ hostel }))
        navigate('/hosteldetail')
    }

    const filterHandler = async (e) => {
        e.preventDefault();
        const res = await FilterHostel(filter);
        setHostels(res);
    }

    const genderChangeHandler = (e) => {
        {
            if (filter.sex === e.target.value) {
                setFilter({ ...filter, sex: '' });
            } else {
                setFilter({ ...filter, sex: e.target.value });
            }
        }
    }

    const bedChangeHandler = (e) => {
        {
            if (filter.bed === e.target.value) {
                setFilter({ ...filter, bed: '' });
            } else {
                setFilter({ ...filter, bed: e.target.value });
            }
        }
    }

    useEffect(() => {
        getHostels();
    }, [])

    const hostelsPerPage = 4;
    const indexOfLastHostel = currentPage * hostelsPerPage;
    const indexOfFirstHostel = indexOfLastHostel - hostelsPerPage;
    const currentHostels = hostels.slice(indexOfFirstHostel, indexOfLastHostel);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <div className='hostel-boys'>
                <div className='hostel-filter'>
                    <h3>Filter</h3>
                    <div>
                        <label for="slider">Price: </label>
                        <input type="range" name="slider" min="0" max="50000" value={filter.price} onChange={e => setFilter({ ...filter, price: e.target.value })} />
                        {filter.price}
                    </div>
                    <div className='option-value'>
                        <label>Gender: </label>
                        <div>
                        <div>
                        <input type='radio' name='sex' value='Boys' checked={filter.sex === 'Boys'} onChange={e => genderChangeHandler(e)} />
                        <label>Boys</label>
                        </div>
                        <div>
                        <input type='radio' name='sex' value='Girls' checked={filter.sex === 'Girls'} onChange={e => genderChangeHandler(e)} />
                        <label>Girls</label>
                        </div>
                        </div>
                    </div>
                    <div className='option-value'>
                        <label>Beds: </label>
                        <div>
                        <div>
                        <input type='radio' name='bed' value='Single' checked={filter.bed === 'Single'} onChange={e => bedChangeHandler(e)} />
                        <label>Single</label>
                        </div>
                        <div>
                        <input type='radio' name='bed' value='Double' checked={filter.bed === 'Double'} onChange={e => bedChangeHandler(e)} />
                        <label>Double</label>
                        </div>
                        <div>
                        <input type='radio' name='bed' value='Triple' checked={filter.bed === 'Triple'} onChange={e => bedChangeHandler(e)} />
                        <label>Triple</label>
                        </div>
                        </div>
                    </div>
                    <div className="star-rating">
                        <label>Rating: </label>
                        {[...Array(5)].map((_, i) => (
                            <StarIcon
                                key={i}
                                className={i < hoverStar ? "star" : ""}
                                onClick={() => setFilter({ ...filter, rating: i + 1 })}
                                onMouseEnter={() => setHoverStar(i + 1)}
                                onMouseLeave={() => setHoverStar(filter.rating)}
                            />
                        ))}
                    </div>
                    <button onClick={e => filterHandler(e)} >Search</button>
                </div>

                {
                    currentHostels.map((hostel) => (
                        <div className='hostel-boys-item' key={hostel._id} >
                            <div>
                            <img src={`http://localhost:5000/assets/${hostel.imagepath1}`} />
                            </div>
                            <div className='hostel-highlight'>
                                <div className='highlight-one'>
                                    <h2>{hostel.title}</h2>
                                    <p className='address-hostel'>{hostel.location}</p>
                                    <p className='hostel-offer'>Wifi&middot;24hrElectricity&middot; CCTV &middot;Hotwater</p>
                                    <p className='sex'>{hostel.sex}</p>
                                </div>
                                <div className='highlight-two'>
                                    <div className='btn-see-more'>
                                        <button onClick={(e) => seeMoreHandler(e, hostel)} >See More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className="pagination">
                    {hostels.length > hostelsPerPage && (
                        <ul className="pagination-list">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                            {[...Array(Math.ceil(hostels.length / hostelsPerPage))].map((_, index) => (
                                <li key={index} className="pagination-item">
                                    <button onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? "pagination-link active" : "pagination-link"}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(hostels.length / hostelsPerPage)}>Next</button>
                        </ul>
                    )}
                </div>
            </div >
        </>
    )
}