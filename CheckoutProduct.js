import Image from 'next/image'
import {StarIcon} from '@heroicons/react/solid'
import Currency from 'react-currency-formatter'
import {addToBasket} from '../slices/basketSlice'
import {removeFromBasket} from '../slices/basketSlice'
import {useDispatch} from 'react-redux'


function CheckoutProduct({id,title,price, description, category, image, rating, hasPrime})  {
    const dispatch = useDispatch()

    const addItemToBasket = () => {
        const product = {
            id, title,price, description, category, image, hasPrime, rating
        }
        //Sending the product as an action into the redux store.
        dispatch(addToBasket(product))
     }
     const removeItemFromBasket = () =>{
         dispatch(removeFromBasket({id}))
     }

    return (
        <div className="grid grid-cols-5" >
            <Image src={image} height={200} width={200} objectFit='contain'/>

            <div className='col-span-3 mx-5' >
                <p>{title}</p>
                <div>
                    {Array(rating).fill().map(i => (
                        <StarIcon className='h-6 text-yellow-400 '/>
                    ))}
                
                <p className='text-xs mt-2 mb-2 line-clamp-3' >{description}</p>
                <Currency quantity={price} currency='INR'/>

                {hasPrime && (
                <div className='flex items-center space-x-2-mt-5' >
                    <Image src='https://links.papareact.com/fdw' width={50} height={50} objectFit='contain'/>
                    <p className='text-xs text-gray-700' >Free delivery</p>
                 </div>
                )}
                </div>

                <div className='flex flex-col space-y-2 my-auto justify-self-end' >
                    <button onClick={addItemToBasket} className='bg-gradient-to-b from-yellow-200 to-yellow-400 p-2 text-xs md:text-sm mt-3 rounded-sm focus:outline-none focus:ring-yellow-500 active:from-yellow-500'>Add to Basket</button>
                    <button onClick={removeItemFromBasket} className='bg-gradient-to-b from-yellow-200 to-yellow-400 p-2 text-xs md:text-sm mt-3 rounded-sm focus:outline-none focus:ring-yellow-500 active:from-yellow-500'>Remove from Basket</button>      
                </div>
            </div>
        </div>
    )
}

export default CheckoutProduct
