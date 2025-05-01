import React from 'react'
import { Link } from 'react-router-dom'


interface BookCardProps { 
  id: string;
  title: string;
  image: string;
  price: number;
}

const BookCard  = ({id,title,image,price}: BookCardProps) => {
  return (
    <div className='shadow p-4 rounded'>
      <Link to={`/product/${id}`} className='flex flex-col items-center'>
        <img src={image} alt={title} className='w-full h-32 object-cover mb-2' />
        <h2 className=' font-semibold'>{title}</h2>
        <p className='text-gray-700'>${price.toFixed(2)}</p>
      </Link>
    </div>
  )
}

export default BookCard
