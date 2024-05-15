'use client'

import { SearchManufacturer } from '.';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button
        type="submit"
        className={`-ml-3 z-10 ${otherClasses}`}
    >
        <Image 
            src='/magnifying-glass.svg'
            alt='search'
            width={40}
            height={40}
            className='object-contain'
        />
    </button>
)

const SearchBar = ({ setManufacturer, setModel}) => {

    const [setSearchManufacturer, isSetSearchManufacturer] = useState('');
    const [setSearchModel, isSetSearchModel] = useState('');
    const router = useRouter();
    
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        if(setSearchModel === '' && setSearchManufacturer === '') {
            return alert('Please fill the search bar');
        }

        setModel(setSearchModel);
        setManufacturer(setSearchManufacturer);
    }

    return (
        <form className='searchbar' onSubmit={handleSearch}>
            <div className='searchbar__item'>
                <SearchManufacturer 
                    selected={setSearchManufacturer}
                    setSelected={isSetSearchManufacturer}
                />

                <SearchButton 
                    otherClasses='sm:hidden'
                />
            </div>

            <div className='searchbar__item'>
                <Image 
                    src='/model-icon.png'
                    alt='car model'
                    width={25}
                    height={25}
                    className='absolute w-[20px] h-[20px] ml-4'
                />
                <input 
                    type="text" 
                    name='model'
                    value={setSearchModel}
                    onChange={(e) => isSetSearchModel(e.target.value)}
                    placeholder='Car Model'
                    className='searchbar__input'
                />
                <SearchButton 
                    otherClasses='sm:hidden'
                />
            </div>

            <SearchButton 
                otherClasses='max-sm:hidden'
            />
        </form>
    )
}

export default SearchBar