
import All_Products from '@/src/components/All_Products';
import SortSelect from '@/src/components/SortSelect';
import Link from 'next/link';
import { Suspense } from 'react';


export const instant = false;
interface IParams {
    params: Promise<{
        id: string;
    }>;


    searchParams: Promise<{
        sort?: string;
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

const CetagoryPage = async ({ params, searchParams }: IParams) => {

    const { id } = await params;
    const { sort = "latest" } = await searchParams;

    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products?category=${id}`);

    const data: IProductTypes[] = await res.json();

    // Sorting

    const sortedData = [...data].sort((a, b) => {
        if (sort === 'price-low') {
            return a.today - b.today;
        }
        if (sort === 'price-high') {
            return b.today - a.today
        }
        return 0
    })





    return (
        <div className="container mx-auto mt-8">
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

            {/* Sorting */}
            <div className="mt-4 flex justify-end rounded-2xl border border-gray-200 bg-white px-3 py-5">

            </div>

            <div className="mt-6">
                <SortSelect sort={sort} />
                <h1>মোট {sortedData.length}টি পণ্য দেখানো হচ্ছে</h1>
                <div className="mt-2 grid grid-cols-1 gap-3.5 px-3 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">

                    {sortedData.map((item: IProductTypes) => (
                        <div
                            key={item.id}
                            className="rounded-2xl border border-gray-200 bg-white p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200  hover:border-gray-300  hover:border-sm"
                        >
                            <Link href={`/details/${item.id}`}>
                                <div className="flex items-center justify-between gap-3 cursor-pointer">


                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0F6F2]">
                                            <span className="text-3xl">{item.image}</span>
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="truncate text-lg font-bold text-[#1F2937]">
                                                {item.nameBn}
                                            </h2>

                                            <p className="text-sm text-gray-500">
                                                প্রতি {item.unit}
                                            </p>
                                        </div>
                                    </div>


                                    <div
                                        className={`shrink - 0 rounded - full px - 3 py - 1 text - xs font - medium ${item.change.dir === "up"
                                            ? "bg-red-50 rounded-xl px-1 py-0.5 text-red-600"
                                            : "bg-green-50 rounded-xl px-1 py-0.5 text-green-600"
                                            }`}
                                    >
                                        <span>
                                            {item.change.dir === "up" ? "▲" : "▼"}
                                            {Math.abs(item.change.pct)}%
                                        </span>
                                    </div>
                                </div>


                                <div className="mt-4">
                                    <p className="text-sm text-gray-500">আজকের দাম</p>

                                    <h3 className="text-[20px] font-bold text-[#111827]">
                                        {item.today} টাকা
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div >

    );
};

export default CetagoryPage;