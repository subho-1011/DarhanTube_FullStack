'use client';

import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
    const [healthyString, setHealthyString] = useState('');

    useEffect(() => {
        const getHealthyString = async () => {
            try {
                await axios.get('http://localhost:8000/api/v1/healthcheck').then((response) => {
                    setHealthyString(response.data.message);
                });
            } catch (error) {
                console.log(error);
            }
        };

        getHealthyString();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 to-zinc-100 bg-clip-text text-3xl font-extrabold text-transparent">
                    darshan-tube
                </p>

                <p>{healthyString}</p>
            </div>
        </main>
    );
}
