'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Hero, CustomFilter, SearchBar, CarCard, ShowMore } from '@/components';
import { fetchCars } from '@/utils';
import { fuels, yearsOfProduction } from '@/constants';

export default function Home() {

  const [setAllCars, isSetAllCars] = useState([]);
  const [setLoading, isSetLoading] = useState(false);

  const [setManufacturer, isSetManufacturer] = useState('');
  const [setModel, isSetModel] = useState('');
  const [setFuel, isSetFuel] = useState('');
  const [setYear, isSetYear] = useState(2022);
  const [setLimit, isSetLimit] = useState(10);

  const getCars = async () => {

    isSetLoading(true);

    try {

      const results = await fetchCars({
        manufacturer: setManufacturer || '',
        year: setYear || 2022,
        fuel: setFuel || '',
        limit: setLimit || 10,
        model: setModel || '',
      });
      
      console.log(results);

      isSetAllCars(results);

    } catch (error) {

      console.log(error);

    } finally {

      isSetLoading(false);

    }
  }

  useEffect(() => {
    getCars();
  }, [setManufacturer, setModel, setFuel, setYear, setLimit]);
  
  // const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>

        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar 
            setManufacturer={isSetManufacturer}
            setModel={isSetModel}
          />

          <div className='home__filter-container'>
            <CustomFilter 
              title="fuel" 
              options={fuels} 
              setFilter={setFuel}
            />
            <CustomFilter 
              title="year" 
              options={yearsOfProduction} 
              setFilter={setYear}
            />
          </div>
        </div>

        { setAllCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {
                setAllCars?.map((car) => (
                  <CarCard 
                    car={car}
                  />
                ))
              }
            </div>
            
            {
              setLoading && (
                <div className='mt-16 w-full flex-center'>
                  <Image 
                    src='/loader.svg'
                    alt='loader'
                    width={50}
                    height={50}
                    className='object-contain'
                  />
                </div>
              )
            }

            <ShowMore 
              pageNumber={setLimit /10}
              isNext={setLimit > setAllCars.length}
              setLimit={setLimit}
            />
            
          </section>
        ) : (
          <div className='home__eror-container'>
            <h2 className='text-black text-xl font-bold'>Opps, no results</h2>
            {/* <p>{ allCars?.message }</p> */}
          </div>
        )}
      </div>
    </main>
  )
}