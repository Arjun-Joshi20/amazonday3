import Header from '../components/Header'
import Head from 'next/head'
import Image from 'next/image'
import {selectItems, selectTotal} from '../slices/basketSlice'
import {useSelector} from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct'
import Currency from 'react-currency-formatter'
import { useSession } from 'next-auth/client'
function Checkout() {

    const items = useSelector(selectItems)
    const [session] = useSession()
    const total = useSelector(selectTotal)

    return (
        <div className=" bg-gray-100 " >
            <Head> 
                <title>Checkout</title>
            </Head>
            <Header />
            <main className="lg:flex main-w-screen-2xl mx-auto" >
                <div className="flex-grow m-5 shadow-lg" >
                    <Image 
                        src='https://links.papareact.com/ikj'
                        width={1020}
                        height={250}
                        objectFit='contain'
                    />
                    <div className='flex flex-col p-5 space-y-10 bg-white' >
                        <h1 className=' text-3xl '>{items.length === 0 ? "You Amazon Basket is Empty" : 'Shopping Basket'}</h1>
                        {items.map((item, i) => (
                            <CheckoutProduct 
                                key={i}
                                id={item.id}
                                title={item.title}
                                description={item.description}
                                price={item.price}
                                category={item.category}
                                image={item.image}
                                rating={item.rating}
                                hasPrime={item.hasPrime}
                            />
                        ) )}
                    </div>
                </div>
                <div className='flex flex-col p-5 space-y-10 bg-white' >
                    {items.length > 0 && (
                        <>
                            <h2 className='whitespace-nowrap' >
                                <h2>Subtotal {items.length} Items</h2>
                                <span>
                                    <Currency  quantity={total } currency='INR'/>
                                </span>
                            </h2>
                            <button className={`bg-gradient-to-b from-yellow-200 to-yellow-400 p-2 text-xs md:text-sm mt-3 rounded-sm focus:outline-none focus:ring-yellow-500 ${!session && ' from-gray-300 to-gray-500 cursor-not-allowed'}`} >
                                {!session ? "Sign in to checkout" : "Proceed To Checkout"}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout
