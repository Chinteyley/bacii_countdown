"use client";

import WordReveal from "@/components/prismui/word-reveal";
import NumberFlow from "@/components/prismui/number-flow";
import {useState, useEffect, useMemo} from "react";

export default function LogoCarouselBasic() {
    // Use useMemo to ensure targetDate is only created once
    const targetDate = useMemo(() => new Date("2025-08-18T00:00:00"), [])

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date()
            const difference = targetDate.getTime() - now.getTime()

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((difference % (1000 * 60)) / 1000)

                setTimeLeft({ days, hours, minutes, seconds })
            }
        }

        // Calculate immediately
        calculateTimeLeft()

        // Then update every second
        const interval = setInterval(calculateTimeLeft, 1000)
        return () => clearInterval(interval)
    }, [targetDate]) // Empty dependency array since targetDate is now memoized

    return (
        <div className="h-screen w-full relative">
            {/* Radial gradient overlay */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

            {/* Content */}
            <div className="relative z-10 pt-8">
                <div className="text-center space-y-4 mb-12">
                    <div className="p-8 rounded-lg">
                        <WordReveal
                            text="You know what's coming?"
                            delay={0.15}
                            className="text-2xl md:text-4xl font-light"
                        />
                    </div>
                    <div className="p-8 rounded-lg ">
                        <WordReveal
                            text="The BACII is coming!!!"
                            delay={0.75}
                            className="text-primary"
                        />
                    </div>
                </div>
                <div className="text-center space-y-2">
                    <div className="flex justify-center gap-6 md:gap-8 text-3xl md:text-5xl font-bold">
                        <div className="flex flex-col items-center">
                            <NumberFlow
                                value={timeLeft.days}
                                willChange={true}
                                spinTiming={{
                                    duration: 500,
                                    easing: "ease-out",
                                }}
                            />
                            <span className="text-base md:text-lg mt-2">days</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <NumberFlow
                                value={timeLeft.hours}
                                willChange={true}
                                spinTiming={{
                                    duration: 500,
                                    easing: "ease-out",
                                }}
                            />
                            <span className="text-base md:text-lg mt-2">hours</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <NumberFlow
                                value={timeLeft.minutes}
                                willChange={true}
                                spinTiming={{
                                    duration: 500,
                                    easing: "ease-out",
                                }}
                            />
                            <span className="text-base md:text-lg mt-2">mins</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <NumberFlow
                                value={timeLeft.seconds}
                                willChange={true}
                                spinTiming={{
                                    duration: 500,
                                    easing: "ease-out",
                                }}
                            />
                            <span className="text-base md:text-lg mt-2">secs</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}