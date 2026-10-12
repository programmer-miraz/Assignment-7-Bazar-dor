import All_Products from '@/src/components/All_Products';
import React from 'react';
export const instant = false;
interface IParams {
    params: Promise<{
        id: string;
    }>;


    searchParams: Promise<{
        category?: string;
    }>;

}

interface IChange {
    dir: "up" | "down";
    pct: number;
}
interface IProductTypes {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryIcon: string;
    categoryNameBn: string;
    unit: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: IChange;
    image: string;
}

const page = async ({ params, searchParams }: IParams) => {
    const { id } = await params;
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${id}`)
    const data = await res.json()

    
    return (
        <div className='container mx-auto mt-8'>
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-6 py-5">
                <h1 className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f1] text-3xl">
                    {data[0].categoryIcon}
                </h1>

                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        {data[0].categoryNameBn}
                    </h2>

                    <h3 className="mt-1 text-xs text-slate-500">
                        {data.length}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </h3>
                </div>
            </div>


            <div>
               
            </div>

            <div>
                <h1>মোট {data.length}টি পণ্য দেখানো হচ্ছে</h1>


                <div className='grid grid-cols-1 sm:grid-cols-2 lg:px-0 px-3 lg:grid-cols-3 gap-3.5 mt-4'>

                    {data.map((item: IProductTypes) =>
                        <div key={item.id}>
                            <All_Products item={item}></All_Products>



                        </div>

                    )}

                </div>



            </div>




        </div>
    );
};

export default page;