'use client'

import React from 'react'
import { SearchManufacturer } from '.';
import { useState } from 'react';

const SearchBar = () => {

    const handleSearch = () => {}
    const [setManufacturer, isSetManufacturer] = useState('');

    return (
        <form className='searchbar' onSubmit={handleSearch}>
            <div className='searchbar__item'>
                <SearchManufacturer 
                    manufacturer={setManufacturer}
                    setManufacturer={isSetManufacturer}
                />
            </div>
        </form>
    )
}

export default SearchBar