import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PlusIcon } from '@phosphor-icons/react/dist/ssr'



const steps = [
    { number: 1, title: 'Upload PDF', description: 'Add your book file' },
    { number: 2, title: 'AI Processing', description: 'We analyze the content' },
    { number: 3, title: 'Voice Chat', description: 'Discuss with AI' },
]

const Hero = () => {
    return (
        <section className="wrapper pt-32 pb-10">
            <div className="relative w-full bg-[#f3e4c7] rounded-4xl p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Left Section */}
                <div className="flex-1 space-y-6 z-10">
                    <h1 className="page-title-xl">
                        Your Library
                    </h1>
                    <p className="text-lg text-[#3d485e] max-w-100 leading-relaxed">
                        Convert your books into interactive AI conversations.
                        Listen, learn, and discuss your favorite reads.
                    </p>
                    <Link href="/books/new" className="bg-white text-[#212a3b] px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-soft hover:shadow-soft-md transition-all active:scale-95 group w-fit">
                        <PlusIcon size={20} weight="bold" className="text-[#212a3b]" />
                        <span>Add new book</span>
                    </Link>
                </div>

                {/* Center Section - Illustration */}
                <div className="absolute top-1/2 left-[48%] -translate-x-1/2 -translate-y-[45%] w-full max-w-137.5 pointer-events-none hidden lg:block">
                    <Image
                        src="/assets/hero-illustration.png"
                        alt="Vintage books and globe"
                        width={700}
                        height={500}
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Right Section - Steps Card */}
                <div className="bg-white rounded-2xl p-6 shadow-soft w-full md:w-70 space-y-6 z-10">
                    {steps.map((step) => (
                        <div key={step.number} className="flex items-center gap-4">
                            <div className="size-10 rounded-full border border-[#212a3b] flex items-center justify-center text-lg font-medium shrink-0">
                                {step.number}
                            </div>
                            <div>
                                <h3 className="font-bold text-[#212a3b]">{step.title}</h3>
                                <p className="text-sm text-[#777]">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
         
        </section>
    )
}

export default Hero
