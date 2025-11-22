import { Search, ShoppingCart, CircleUserRound  } from "lucide-react"

export default function main(){
    // const Navmobile = () => {

    // }
    return(
        <div>
            <header>
                <div className="flex justify-center items-center px-5 py-5 gap-10">
                    {/* <div className="block sm:hidden m-2">
                        <svg viewBox="0 0 100 1.5" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0" y1="0" x2="5" y2="0" stroke="black" />
                        </svg>
                        <svg viewBox="0 0 100 1.5" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0" y1="0" x2="5" y2="0" stroke="black" />
                        </svg>
                        <svg viewBox="0 0 100 1.5" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0" y1="0" x2="5" y2="0" stroke="black" />
                        </svg>
                    </div> */}
                    <div className="text-3xl font-black">
                        <h1>SHOP.CO</h1>
                    </div>
                    <div>
                        <nav>
                            <ul className="flex gap-10">
                                <li>Shop</li>
                                <li>On Sale</li>
                                <li>New Arrivals</li>
                                <li>Brands</li>
                            </ul>
                        </nav>
                    </div>
                    <div className="round-full border flex rounded-4xl p-1 w-100 bg-gray-200">
                        <Search className="text-gray-500 mr-1" />
                        <input type="text" placeholder="Search for products..." className="px-2 rounded-4xl w-full"/>
                    </div>
                    <div className="flex gap-2">
                        <ShoppingCart />
                        <CircleUserRound />
                    </div>
                </div>
            </header>
            <main className="bg-gray-100"> 
                <div>
                    <div>
                        <h2 className="text-5xl font-extrabold">FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE</h2>
                    </div>
                </div>
            </main>
        </div>
    )
}