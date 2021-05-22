import Image from 'next/image'
import {useState} from 'react'
import {StarIcon} from '@heroicons/react/solid'
import Currency from 'react-currency-formatter'
import {addToBasket} from '../slices/basketSlice'
import {useDispatch} from 'react-redux'

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({id, title,price, description, category, image}) {
    const dispatch = useDispatch()

    const [rating] = useState(
        Math.floor(Math.random() * (MAX_RATING - MIN_RATING - 1)) + MIN_RATING
     )

     const addItemToBasket = () => {
        const product = {
            id, title,price, description, category, image, hasPrime, rating
        }
        //Sending the product as an action into the redux store.
        dispatch(addToBasket(product))
     }
    
     const [hasPrime] = useState(Math.random() < 0.5)
    return (
        <div className="relative flex flex-col m-5 bg-gray-100 z-30 p-10" >
            <p className='absolute top-2 right-2 text-xs italic text-gray-600' >{category}</p>

            <Image src={image} height={200} width={200} objectFit='contain' />


            <h4 className='my-3' >{title}</h4>
            
            <div className="flex flex-row" >
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon className='h-5 text-yellow-500' />
                    ))
                }
            </div>

            <p className='text-xs my-2 line-clamp-2' >{description}</p>

            <div className='mb-5' >
                <Currency quantity={price} currency='INR' />
            </div>

            {hasPrime && (
                <div className='flex items-center space-x-2-mt-5' >
                    <Image src='https://links.papareact.com/fdw' width={100} height={100} objectFit='contain'/>
                    <p className='text-xs text-gray-700' >Free delivery</p>
                </div>

            )
                
            }
            <button onClick={addItemToBasket} className='bg-gradient-to-b from-yellow-200 to-yellow-400 p-2 text-xs md:text-sm mt-3 rounded-sm focus:outline-none focus:ring-yellow-500 active:from-yellow-500 '>Add to Basket</button>

        </div>
    )
}

export default Product
