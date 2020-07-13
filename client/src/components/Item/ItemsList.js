import React, { useEffect, useState } from 'react';
import ItemPreview from './ItemPreview'
import './ItemsList.scss'
import notFound from '../../assets/images/notFound.jpg';

import { Dots } from 'react-activity';
import axios from 'axios';

import { useLocation } from "react-router-dom";
import CategoriesBreadcrumb from '../Categories/CategoriesBreadcrumb'
import { Helmet } from "react-helmet";

const ItemsList = () => {
    let location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});
    console.log(location)
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:9000/api/items' + location.search,
            );
            setData(result.data);
        };
        fetchData();
        setIsLoading(false);
    }, [location, setData, setIsLoading]);

    console.log(data)
    return (
        <div className="Results">
            {isLoading ? <Dots /> : <div>
                <Helmet htmlAttributes>
                    <title>Mercadolibre</title>
                    <meta name="description" content={"Resultados para: " + location.search.slice(3)} />
                </Helmet>
                <CategoriesBreadcrumb categories={data.categories} />
                {data.items ? data.items.map(item => {
                    return (
                        <ItemPreview item={item} />
                    );
                }) :
                    <div className="NotFoundContainer">
                        <p>Lo sentimos, no hemos encontrado resultados para tu búsqueda, intenta usando otra palabra</p>
                        <img src={notFound}
                            alt="item"
                            resizeMode='cover'
                            className="NotFoundImage"
                        />
                    </div>}
            </div>}
        </div>
    )
}

export default ItemsList;