import React, { useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import Navbar from '@/components/Navbar';

const Cart = () => {
    const { items, removeFromCart, total, clearCart } = useCart();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cart-item', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                delay: 0.2
            });
        }, containerRef);
        return () => ctx.revert();
    }, [items]);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <div ref={containerRef} className="max-w-7xl mx-auto px-6 pt-32 pb-12">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-6xl font-bebas uppercase">Your Cart</h1>
                    <span className="font-mono text-muted-foreground">{items.length} ITEMS</span>
                </div>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                        <ShoppingBag className="w-24 h-24 text-muted-foreground/20" />
                        <h2 className="text-2xl font-bebas uppercase text-muted-foreground">Your cart is empty</h2>
                        <Link
                            to="/"
                            className="bg-foreground text-background px-8 py-3 font-bebas text-lg uppercase tracking-wider hover:opacity-90 transition-opacity rounded-full"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="cart-item flex gap-6 p-6 bg-card rounded-2xl border border-border/50 hover:border-border transition-colors group"
                                >
                                    <div className="w-32 h-32 bg-secondary/30 rounded-xl p-2 flex items-center justify-center relative overflow-hidden">
                                        <div
                                            className="absolute inset-0 opacity-20"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between py-2">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">{item.brand}</h3>
                                                    <h2 className="text-2xl font-bebas uppercase tracking-wide">{item.name}</h2>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-muted-foreground hover:text-destructive transition-colors p-2"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2">Size: US 9 (Default)</p>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-mono text-muted-foreground">QTY: {item.quantity}</span>
                                            </div>
                                            <span className="text-xl font-bebas">{item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-card p-8 rounded-3xl border border-border/50 sticky top-32">
                                <h2 className="text-2xl font-bebas uppercase mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-mono">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="font-mono">Calculated at checkout</span>
                                    </div>
                                    <div className="h-px bg-border my-4" />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="font-mono">${total.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button className="w-full bg-foreground text-background py-4 font-bebas text-xl uppercase tracking-wider hover:opacity-90 transition-opacity rounded-xl flex items-center justify-center gap-2 mb-4">
                                    Checkout <ArrowRight className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={clearCart}
                                    className="w-full text-xs font-mono text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
