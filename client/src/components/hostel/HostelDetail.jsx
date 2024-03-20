import React, { useEffect, useState } from "react";
import "./Hosteldetail.scss";
import img1 from "../../assets/carousel/one.jpg";
import img2 from "../../assets/carousel/two.jpg";
import img3 from "../../assets/carousel/three.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AddHostelReview,
  GetHostelReview,
} from "../../function/HostelReview";
import {
  CreatePayment,
  GetPaymentByHostel,
  VerifyPayment,
} from "../../function/Payment";
import { format } from "timeago.js";
import StarIcon from "@mui/icons-material/Star";
import { selectBooking, selectHostel } from "../../redux/Index";
import HostelDetailMap from "./HostelDetailMap";

export const HostelDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const hostel = state.selectedHostel;
  const username = state.user.username;
  const tempHostel = hostel;
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeSection, setActiveSection] = useState("description");
  const [review, setReview] = useState({
    username,
    hostel: hostel.title,
    rating: 1,
  });
  const [reviews, setReviews] = useState([]);
  const [hoverStar, setHoverStar] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [isBook, setIsBook] = useState(false);
  const [booking, setBooking] = useState({})

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };
  //section-onclick-reviews and descriptrion
  const switchSection = (section) => {
    setActiveSection(section);
  };

  const addReviewHandler = async (e) => {
    e.preventDefault();
    const res = await AddHostelReview(review);
    if (!res.success) return;
    setReview({ username, hostel: hostel.title, rating: 1, review: "" });
    setHoverStar(1);
    getReviews();
  };

  const getReviews = async () => {
    const res = await GetHostelReview({ hostel: hostel.title });
    setReviews(res);
  };

  const createPayment = async () => {
    if (params.isPayment === "success") {
      const res = await CreatePayment(state.booking);
      if (!res.success) return;
      dispatch(selectHostel({ hostel: res.hostel[0] }))
    }
  };

  const verifyPayment = async () => {
    !username && navigate("/login");
    const book = { ...booking, hostel: hostel.title, price: hostel.price, email: state.user.email }
    console.log(book)
    dispatch(selectBooking({ book }));
    const res = await VerifyPayment({
      hostel: hostel.title,
      price: hostel.price,
    });

    window.location.replace(res.url);
  };

  useEffect(() => {
    getReviews();
    createPayment();
    const timeout = setTimeout(() => {
      setShowButton(true);
    }, 500);
    return () => clearTimeout(timeout);

  }, []);

  return (
    <>
      <div className="boys-hostel">
        <div className="hostel-top">
          <div className="image-section">
            <div>
              <img
                src={`http://localhost:5000/assets/${hostel.imagepath1}`}
                className="hostel-img full"
                onClick={() =>
                  openImage(`http://localhost:5000/assets/${hostel.imagepath1}`)
                }
              />
            </div>
            <div className="two-img">
              <img
                src={`http://localhost:5000/assets/${hostel.imagepath2}`}
                className="hostel-img"
                onClick={() => openImage(img2)}
              />
              <img
                src={`http://localhost:5000/assets/${hostel.imagepath3}`}
                className="hostel-img"
                onClick={() => openImage(img3)}
              />
            </div>
          </div>
          <div className="map-section">
            <HostelDetailMap />
          </div>
          {selectedImage && (
            <div className="full-image-overlay" onClick={closeImage}>
              <div className="full-image-container">
                <span className="close-button" onClick={closeImage}>
                  &times;
                </span>
                <img src={selectedImage} className="full-image" alt="Hostel" />
              </div>
            </div>
          )}
        </div>
        <div className="hostel-detail">
          <h1>{hostel.title}</h1>
          <div className="description-review">
            <div
              className={`description ${activeSection === "description" ? "active" : ""
                }`}
              onClick={() => switchSection("description")}
            >
              Description
            </div>
            <div
              className={`reviews ${activeSection === "reviews" ? "active" : ""
                }`}
              onClick={() => switchSection("reviews")}
            >
              Reviews
            </div>
          </div>
          {activeSection === "description" && (
            <div className="description-onclick">
              <h3>Hostel information</h3>
              <p>{hostel.description}</p>
              <table className="table" >
                <thead>
                  <tr>
                    <th>Floor</th>
                    <th>Room</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(hostel.floor).map(floorIndex => (

                    // Mapping over each floor object
                    Object.keys(hostel.floor[floorIndex]).map(roomName => (
                      // Mapping over each room object inside the floor
                      <tr key={roomName}>
                        <td>Floor {floorIndex}</td>
                        <td>{roomName} seater</td>
                        <td>{hostel.floor[floorIndex][roomName].price}</td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
              <button className="btn-booking" onClick={() => username ? setIsBook(true) : navigate("/login")}>
                Book now!
              </button>

              {isBook
                &&
                <div className="booking-section" >
                  <div className="container">
                    <div className="close-button" onClick={() => setIsBook(false)} >X</div>
                    <div>
                      <label>Stay Duration<span>(in months)</span></label>
                      <input type="number" />
                    </div>
                    <div>
                      <label>Starting Date</label>
                      <input type="date" />
                    </div>
                    <div>
                      <label>Private</label>
                      <input type="number" />
                    </div>
                    <div>
                      <label>Two Sharing</label>
                      <input type="number" />
                    </div>
                    <div>
                      <label>Three Sharing</label>
                      <input type="number" />
                    </div>
                    <div>
                      <label>Four Sharing</label>
                      <input type="number" />
                    </div>
                  </div>
                </div>
              }
            </div>
          )}
          {activeSection === "reviews" && (
            <div className="reviews-onclick">
              <h3>Reviews</h3>
              <div className="user-review">
                {reviews &&
                  reviews.map((review, i) => (
                    <div key={i}>
                      <p>
                        <div>
                          <span className="user-name">{review.username}</span>
                          <span className="date">
                            {format(review.createdAt)}
                          </span>
                        </div>
                        <div>{review.review}</div>
                      </p>
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={i < review.rating ? "active" : ""}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="comment-review">
                <h4>Write a Review</h4>
                <div className="star-rating">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={i < hoverStar ? "star" : ""}
                      onClick={() => setReview({ ...review, rating: i + 1 })}
                      onMouseEnter={() => setHoverStar(i + 1)}
                      onMouseLeave={() => setHoverStar(review.rating)}
                    />
                  ))}
                </div>
                <div className="comment-section">
                  <div>
                    <textarea
                      value={review.review}
                      onChange={(e) =>
                        setReview((prev) => ({
                          ...prev,
                          review: e.target.value,
                        }))
                      }
                      placeholder="Share your experience"
                    />
                  </div>
                  <div className="btn-submit">
                    <button onClick={(e) => addReviewHandler(e)}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div >
    </>
  );
}