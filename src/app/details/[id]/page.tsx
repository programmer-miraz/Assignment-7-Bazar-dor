import { notFound } from 'next/navigation';
import React from 'react';
interface IProduct {
    id: number;
    slug: string;
    nameBn: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: {
        dir: string;
        pct: number;
    };
    markets: IMarket[];
}
interface IMarket {
    market: string;
    division: string;
    min: number;
    max: number;
}
const page = async ({ params }: { params: { id: string } }) => {
    const { id } = params
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`)
     if (!res.ok) {
        notFound()
    }
    const data = await res.json()
    return (
        <div>

        </div>
    );
};

export default page;