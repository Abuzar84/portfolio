'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ShoppingCart, Search, Menu, X, Heart, Star, ChevronRight, TrendingUp, Zap, Shield, User, LogOut, Loader2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Types
interface Product {
    id: number;
    name: string;
    price: number;
    original_price: number;
    rating: number;
    reviews: number;
    image: string;
    category: string;
    badge: string;
}

interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    product: Product;
}

const categories = ['All', 'Electronics', 'Fashion', 'Wearables', 'Accessories', 'Tech', 'Footwear'];

export default function EcommercePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [cartLoading, setCartLoading] = useState(false);
    const router = useRouter();

    // Initial Data Fetch
    useEffect(() => {
        checkUser();
        fetchProducts();
    }, []);

    // Fetch Cart when user changes
    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCartItems([]);
        }
    }, [user]);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    };

    const fetchProducts = async () => {
        setLoading(true);
        let query = supabase.from('products').select('*');

        if (selectedCategory !== 'All') {
            query = query.eq('category', selectedCategory);
        }

        if (searchQuery) {
            query = query.ilike('name', `%${searchQuery}%`);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching products:', error.message, error);
        } else {
            setProducts(data || []);
        }
        setLoading(false);
    };

    // Re-fetch products when filters change
    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, searchQuery]);

    const fetchCart = async () => {
        if (!user) return;

        const { data, error } = await supabase
            .from('cart_items')
            .select('*, product:products(*)')
            .eq('user_id', user.id);

        if (error) {
            console.error('Error fetching cart:', error);
        } else {
            setCartItems(data as any || []);
        }
    };

    const addToCart = async (product: Product) => {
        if (!user) {
            router.push('/ecommerce/login');
            return;
        }

        setCartLoading(true);

        // Check if item already exists
        const existingItem = cartItems.find(item => item.product_id === product.id);

        if (existingItem) {
            const { error } = await supabase
                .from('cart_items')
                .update({ quantity: existingItem.quantity + 1 })
                .eq('id', existingItem.id);

            if (!error) fetchCart();
        } else {
            const { error } = await supabase
                .from('cart_items')
                .insert({
                    user_id: user.id,
                    product_id: product.id,
                    quantity: 1
                });

            if (!error) fetchCart();
        }
        setCartLoading(false);
    };

    const removeFromCart = async (itemId: number) => {
        const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', itemId);

        if (!error) fetchCart();
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
        );
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-x-hidden">
            <div className='fixed top-0 left-0 right-0 z-50'>
                {/* Navigation */}
                <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100 ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <Link href="/" className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                    <ShoppingCart className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    ShopHub
                                </span>
                            </Link>

                            {/* Search Bar (Desktop) */}
                            <div className="hidden md:flex flex-1 max-w-lg mx-8">
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
                                        placeholder="Search for products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Right Side Icons */}
                            <div className="flex items-center space-x-4">
                                {user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm font-medium text-gray-700 hidden lg:block">
                                            Hi, {user.user_metadata?.full_name || 'User'}
                                        </span>
                                        <button
                                            onClick={handleLogout}
                                            className="p-2 hover:bg-red-50 rounded-full transition-colors text-gray-700 hover:text-red-600"
                                            title="Logout"
                                        >
                                            <LogOut className="w-6 h-6" />
                                        </button>
                                    </div>
                                ) : (
                                    <Link href="/ecommerce/login" className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium">
                                        <User className="w-5 h-5" />
                                        <span>Login</span>
                                    </Link>
                                )}

                                <button className="relative p-2 hover:bg-purple-50 rounded-full transition-colors">
                                    <Heart className="w-6 h-6 text-gray-700" />
                                    {favorites.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {favorites.length}
                                        </span>
                                    )}
                                </button>

                                <div className="relative group">
                                    <button className="relative p-2 hover:bg-purple-50 rounded-full transition-colors">
                                        <ShoppingCart className="w-6 h-6 text-gray-700" />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {cartCount}
                                            </span>
                                        )}
                                    </button>

                                    {/* Cart Dropdown Preview */}
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 hidden group-hover:block p-4 z-50">
                                        <h3 className="font-bold text-gray-900 mb-3">Shopping Cart</h3>
                                        {cartItems.length === 0 ? (
                                            <p className="text-gray-500 text-sm text-center py-4">Your cart is empty</p>
                                        ) : (
                                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                                {cartItems.map(item => (
                                                    <div key={item.id} className="flex items-center space-x-3">
                                                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-md object-cover" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                                                            <p className="text-xs text-gray-500">{item.quantity} x ${item.product.price}</p>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <div className="border-t pt-3 mt-3">
                                                    <div className="flex justify-between font-bold text-gray-900">
                                                        <span>Total:</span>
                                                        <span>${cartItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0).toFixed(2)}</span>
                                                    </div>
                                                    <button className="w-full mt-3 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700">
                                                        Checkout
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    className="md:hidden p-2"
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                >
                                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden bg-white border-t border-purple-100">
                            <div className="px-4 py-4 space-y-3">
                                <input
                                    type="text"
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium">Home</a>
                                <a href="#products" className="block text-gray-700 hover:text-purple-600 font-medium">Products</a>
                                <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium">Deals</a>
                                <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium">About</a>
                            </div>
                        </div>
                    )}
                </nav>
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">
                                <Zap className="w-4 h-4" />
                                <span>Limited Time Offer</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                                Discover Your
                                <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    Perfect Style
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600">
                                Shop the latest trends with up to 40% off on premium products. Free shipping on orders over $100.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                                    <span>Shop Now</span>
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                                <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold border-2 border-purple-600 hover:bg-purple-50 transition-colors">
                                    View Deals
                                </button>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-400 rounded-3xl blur-3xl opacity-20"></div>
                            <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                                <img
                                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"
                                    alt="Featured Product"
                                    className="w-full h-auto rounded-2xl"
                                />
                                <div className="absolute bottom-4 right-4 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                                    40% OFF
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {/* Products Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No products found.</p>
                        <button
                            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                            className="mt-4 text-purple-600 font-semibold hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <div
                                key={product.id}
                                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
                            >
                                {/* Product Image */}
                                <div className="relative overflow-hidden bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Badge */}
                                    {product.badge && (
                                        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white ${product.badge === 'Best Seller' ? 'bg-purple-600' :
                                            product.badge === 'New' ? 'bg-blue-600' :
                                                product.badge === 'Sale' ? 'bg-red-600' :
                                                    'bg-orange-600'
                                            }`}>
                                            {product.badge}
                                        </div>
                                    )}

                                    {/* Favorite Button */}
                                    <button
                                        onClick={() => toggleFavorite(product.id)}
                                        className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                                    >
                                        <Heart
                                            className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                                        />
                                    </button>
                                </div>

                                {/* Product Info */}
                                <div className="p-5 space-y-3">
                                    <p className="text-sm text-purple-600 font-semibold">{product.category}</p>
                                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{product.name}</h3>

                                    {/* Rating */}
                                    <div className="flex items-center space-x-2">
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="ml-1 text-sm font-semibold text-gray-700">{product.rating}</span>
                                        </div>
                                        <span className="text-sm text-gray-500">({product.reviews})</span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                                            {product.original_price && (
                                                <span className="ml-2 text-sm text-gray-500 line-through">${product.original_price}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => addToCart(product)}
                                        disabled={cartLoading}
                                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-wait"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                    <ShoppingCart className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold">ShopHub</span>
                            </div>
                            <p className="text-gray-400">Your one-stop shop for premium products at unbeatable prices.</p>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">Shop</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">Support</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
                            <p className="text-gray-400 mb-4">Subscribe for exclusive deals and updates.</p>
                            <div className="flex flex-wrap justify-center items-center space-x-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-purple-600 my-2"
                                />
                                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg transition-shadow my-2">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 ShopHub. Created by Abuzar Sayyed. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
