import Link from 'next/link';
import React from 'react';

const User_info = () => {
    return (
        <div>
            <div className="flex gap-4">
                <Link href='/signin'>
                    <button className="btn whitespace-nowrap border-none font-bold bg-white">

                        সাইন ইন
                    </button>
                </Link>

                <Link href="/signup">
                    <button className="btn whitespace-nowrap bg-[#05893E] font-bold text-white ">
                        সাইন আপ
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default User_info;