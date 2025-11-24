'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, Heart, Star, ChevronRight, TrendingUp, Zap, Shield } from 'lucide-react';

// Product data
const products = [
    {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.8,
        reviews: 1234,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        category: 'Electronics',
        badge: 'Best Seller'
    },
    {
        id: 2,
        name: 'Smart Watch Pro',
        price: 449.99,
        originalPrice: 599.99,
        rating: 4.9,
        reviews: 892,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        category: 'Wearables',
        badge: 'New'
    },
    {
        id: 3,
        name: 'Designer Backpack',
        price: 129.99,
        originalPrice: 179.99,
        rating: 4.7,
        reviews: 567,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        category: 'Fashion',
        badge: 'Sale'
    },
    {
        id: 4,
        name: 'Premium Sunglasses',
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.6,
        reviews: 423,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
        category: 'Accessories',
        badge: 'Hot'
    },
    {
        id: 5,
        name: 'Running Sneakers',
        price: 159.99,
        originalPrice: 199.99,
        rating: 4.8,
        reviews: 1891,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        category: 'Footwear',
        badge: 'Best Seller'
    },
    {
        id: 6,
        name: 'Laptop Stand',
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.5,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
        category: 'Tech',
        badge: 'Sale'
    },
    {
        id: 7,
        name: 'Leather Wallet',
        price: 89.99,
        originalPrice: 119.99,
        rating: 4.7,
        reviews: 678,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop',
        category: 'Accessories',
        badge: 'New'
    },
    {
        id: 8,
        name: 'Wireless Mouse',
        price: 49.99,
        originalPrice: 69.99,
        rating: 4.6,
        reviews: 456,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
        category: 'Tech',
        badge: 'Hot'
    }
];

const categories = ['All', 'Electronics', 'Fashion', 'Wearables', 'Accessories', 'Tech', 'Footwear'];

export default function EcommercePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cartCount, setCartCount] = useState(0);
    const [favorites, setFavorites] = useState<number[]>([]);

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const toggleFavorite = (id: number) => {
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
        );
    };

    const addToCart = () => {
        setCartCount(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 overflow-x-hidden">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-100">
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

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Home</a>
                            <a href="#products" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Products</a>
                            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Deals</a>
                            <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">About</a>
                        </div>

                        {/* Right Side Icons */}
                        <div className="flex items-center space-x-4">
                            <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                <Search className="w-5 h-5 text-gray-600" />
                                <span className="text-sm text-gray-600">Search</span>
                            </button>

                            <button className="relative p-2 hover:bg-purple-50 rounded-full transition-colors">
                                <Heart className="w-6 h-6 text-gray-700" />
                                {favorites.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {favorites.length}
                                    </span>
                                )}
                            </button>

                            <button className="relative p-2 hover:bg-purple-50 rounded-full transition-colors">
                                <ShoppingCart className="w-6 h-6 text-gray-700" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

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
                            <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium">Home</a>
                            <a href="#products" className="block text-gray-700 hover:text-purple-600 font-medium">Products</a>
                            <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium">Deals</a>
                            <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium">About</a>
                        </div>
                    </div>
                )}
            </nav>

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

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4 pt-8">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Shield className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700">Secure Payment</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <TrendingUp className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700">Best Prices</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                        <Zap className="w-6 h-6 text-green-600" />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700">Fast Delivery</p>
                                </div>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
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
                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white ${product.badge === 'Best Seller' ? 'bg-purple-600' :
                                    product.badge === 'New' ? 'bg-blue-600' :
                                        product.badge === 'Sale' ? 'bg-red-600' :
                                            'bg-orange-600'
                                    }`}>
                                    {product.badge}
                                </div>

                                {/* Favorite Button */}
                                <button
                                    onClick={() => toggleFavorite(product.id)}
                                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
                                >
                                    <Heart
                                        className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                                    />
                                </button>

                                {/* Quick View on Hover */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                                        Quick View
                                    </button>
                                </div>
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
                                        <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice}</span>
                                    </div>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={addToCart}
                                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
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
