import React, { useEffect, useState } from 'react';
import ItemPreview from './ItemPreview'
import './ItemsList.scss'

import { Dots } from 'react-activity';
import axios from 'axios';

import { useLocation } from "react-router-dom";
import CategoriesBreadcrumb from '../Categories/CategoriesBreadcrumb'

const ItemsList = () => {
    let location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        setIsLoading(true);
        console.log(location.search);
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:9000/api/items' + location.search,
            );
            setData(result.data);
        };
        fetchData();
        setIsLoading(false);
    }, [location, setData, setIsLoading]);

    return (
        <div className="Results">
            {isLoading ? <Dots /> : <div>
                <CategoriesBreadcrumb categories={data.categories} />
                {data.items ? data.items.map(item => {
                    return (
                        <ItemPreview item={item} />
                    );
                }) : null}</div>}
        </div>
    )
}

export default ItemsList;