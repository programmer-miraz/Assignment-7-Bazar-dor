import React from 'react';
interface ItemType {
    nameBn: string
    id: number
    icon: string
    slug: string
}

const Nav_Link = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories', { next: { revalidate: 10 } })
    const data = await res.json()

    return (

        <div className="border-y border-gray-200 bg-white py-2.5">
            <div className="container mx-auto overflow-x-auto px-4">
                <div className="flex w-max min-w-full  items-center gap-5 sm:gap-8">

                    {data.map((item: ItemType, ind: number) => (
                        <button
                            key={ind}
                            className=" flex shrink-0 cursor-pointer rounded p-1 items-center gap-2 whitespace-nowrap  hover:bg-gray-100"
                        >
                            {item.icon}
                            {item.nameBn}
                        </button>
                    ))}

                </div>
            </div>
        </div>

    );
};

export default Nav_Link;