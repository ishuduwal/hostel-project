import React, { useEffect, useState } from 'react'
import './Admin.scss'
import { GetPayment } from '../../function/Payment';
function PaymentReport() {

    const [payments, setPayments] = useState([]);

    const fetchPayments = async () => {
        const res = await GetPayment();
        setPayments(res);
    }
    useEffect(() => {
        fetchPayments();
    }, [])

    return (
        <div className='payment-report'>
            <table>
                <tr className='manage-title'>
                    <th>S.N</th>
                    <th>Hostel Name</th>
                    <th>Owner email</th>
                    <th>Room</th>
                    <th>Price</th>
                    <th>Check IN</th>
                    <th>Check OUT</th>
                </tr>
                {
                    payments && payments.map((payment,index) => (
                        <tr className='payment-info' key={index}>
                            <td>{ index + 1}</td>
                            <td>{payment.hostel}</td>
                            <td>{payment.email}</td>
                            <td>{payment.room}</td>
                            <td>{payment.price}</td>
                            <td>{payment.checkin.slice(0, 10)}</td>
                            <td>{payment.checkout.slice(0, 10)}</td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default PaymentReport