"use client"

import { Hero } from "./hero"
import Navbar from "./navbar"
import { Readme } from "./readmebtn"


export const HomeComponent = ()=>{
    return <>
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen relative">
            <div className="relative z-10">
                <Navbar theme="light"/>
                <Hero/>
                
            </div>
        </div>
    </div>
    </>
}