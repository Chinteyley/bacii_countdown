"use client";

import WordReveal from "@/components/prismui/word-reveal";
import NumberFlow from "@/components/prismui/number-flow";
import { useState, useEffect } from "react";

export default function LogoCarouselBasic() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const targetDate = new Date("2025-08-18T00:00:00");
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            }
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="container mx-auto px-4 -mt-16">
                <div className="space-y-8">
                    <div className="text-center space-y-4">
                        <div className="p-8 rounded-lg">
                            <WordReveal
                                text="You know what's coming?"
                                delay={0.15}
                                className="text-xl md:text-4xl font-light"
                            />
                        </div>
                        <div className="p-8 rounded-lg ">
                            <WordReveal
                                text="The Bacii is coming!!!"
                                delay={0.75}
                                className="text-3xl md:text-7xl text-primary"
                            />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <div className="flex justify-center gap-6 md:gap-8 text-3xl md:text-5xl font-bold">
                            <div className="flex flex-col items-center">
                                <div className="min-w-[3ch] text-center">
                                    <NumberFlow
                                        value={timeLeft.days}
                                        willChange={true}
                                        spinTiming={{
                                            duration: 500,
                                            easing: "ease-out",
                                        }}
                                    />
                                </div>
                                <span className="text-base md:text-lg mt-2">days</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="min-w-[2ch] text-center">
                                    <NumberFlow
                                        value={timeLeft.hours}
                                        willChange={true}
                                        spinTiming={{
                                            duration: 500,
                                            easing: "ease-out",
                                        }}
                                    />
                                </div>
                                <span className="text-base md:text-lg mt-2">hours</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="min-w-[2ch] text-center">
                                    <NumberFlow
                                        value={timeLeft.minutes}
                                        willChange={true}
                                        spinTiming={{
                                            duration: 500,
                                            easing: "ease-out",
                                        }}
                                    />
                                </div>
                                <span className="text-base md:text-lg mt-2">mins</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="min-w-[2ch] text-center">
                                    <NumberFlow
                                        value={timeLeft.seconds}
                                        willChange={true}
                                        spinTiming={{
                                            duration: 500,
                                            easing: "ease-out",
                                        }}
                                    />
                                </div>
                                <span className="text-base md:text-lg mt-2">secs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}