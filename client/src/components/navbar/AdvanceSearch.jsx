import React, { useState } from 'react'
import Select from 'react-select';
function AdvanceSearch({ setIsAdvSearch }) {

    const [selectedOption, setSelectedOption] = useState("null")


    const sexOptions = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Both', label: 'Both' }
    ]

    const districtOptions = [
        { value: 'Dhaka', label: 'Dhaka' },
        { value: 'Chittagong', label: 'Chittagong' },
        { value: 'Rajshahi', label: 'Rajshahi' },
    ]

    return (
        <>
            <div className='adv-search-close' onClick={() => setIsAdvSearch(false)}>x</div>
            <div className='adv-search-head' >
                <div>
                    <input type="text" placeholder="Search" />
                </div>
                <div>
                    <Select
                        options={sexOptions}
                        onChange={setSelectedOption}
                        isSearchable={false}
                    />
                    <Select
                        options={districtOptions}
                        onChange={setSelectedOption}
                        isSearchable={false}
                    />
                </div>
            </div>
        </>
    )
}

export default AdvanceSearch