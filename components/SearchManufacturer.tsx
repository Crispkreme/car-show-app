'use client'

import { SearchManufacturerProps } from '@/types';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import React, { useState, Fragment } from 'react'
import Image from 'next/image';
import { manufacturers } from '../constants'

const SearchManufacturer = ({ selected, setSelected }: SearchManufacturerProps ) => {
    const [setQuery, isSetQuery] = useState('');
    const filteredManufacturers = 
        setQuery === "" 
            ? manufacturers 
            : manufacturers.filter((item) => (
                item.toLowerCase().replace(/\s+/g, '')
            ))


    return (
        <div className='search-manufacturer'>
            <Combobox value={selected} onChange={setSelected}> 
                <div className='relative w-full'>
                    <ComboboxButton className='absolute top-[14px]'>
                        <Image 
                            src='/car-logo.svg'
                            width={20}
                            height={20}
                            className='ml-4'
                            alt='Car Logo'
                        />
                    </ComboboxButton>
                    <ComboboxInput 
                        className='search-manufacturer__input'
                        placeholder='Rusi'
                        displayValue={(manufacturer: string) => manufacturer}
                        onChange={(e) => isSetQuery(e.target.value)}
                    />

                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        afterLeave={() => isSetQuery('')}
                    >
                        <ComboboxOptions>
                            { 
                                filteredManufacturers.map((item) => (
                                    <ComboboxOption
                                        key={item}
                                        value={item}
                                        className={({ active }) => `
                                            relative search-manufacturer__option ${active ? 'bg-primary-blue text-white' : 'text-gray-100'}
                                        `}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                                >
                                                    {item}
                                                </span>

                                                { selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}
                                                    ></span>
                                                ) : null }
                                            </>
                                        )}
                                    </ComboboxOption>
                                ))
                            }
                        </ComboboxOptions>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchManufacturer
