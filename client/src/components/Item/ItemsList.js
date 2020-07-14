import React, { useEffect, useState } from 'react';
import ItemPreview from './ItemPreview'
import './ItemsList.scss'
import './ItemGeneralStyles.scss'
import notFound from '../../assets/images/not-found.png';

import LoadingScreen from '../Animations/LoadingScreen';
import axios from 'axios';

import { useLocation } from "react-router-dom";
import CategoriesBreadcrumb from '../Categories/CategoriesBreadcrumb'
import { Helmet } from "react-helmet";

const ItemsList = () => {

    const url = process.env.REACT_APP_SEARCH_URL;
    let location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [previousLocation, setPreviousLocation] = useState("");
    const [data, setData] = useState({});
    useEffect(() => {
        if (location.search !== previousLocation) {
            setPreviousLocation(location.search);
            const fetchData = async () => {
                setIsLoading(true);
                const result = await axios.get(
                    url + location.search,
                    {
                        headers: {
                            first: 'Gabriel',
                            last: 'Quijada'
                        }
                    }
                );
                setData(result.data);
            };
            fetchData();
            setIsLoading(false)
        }
    }, [location, previousLocation, setData, setIsLoading, url]);

    return (
        <div className="Results">
            <div>

                <Helmet>
                    <title>Mercadolibre</title>
                    <meta name="description" content={"Resultados para: " + location.search.slice(3)} />
                </Helmet>

                {!isLoading && data.items ?
                    <div>
                        <CategoriesBreadcrumb categories={data.categories} />
                        {data.items.length > 0 ? data.items.map(item => {
                            return (
                                <ItemPreview item={item} key={item.id}/>
                            );
                        }) :
                            <div className="NotFoundContainer">
                                <p className="NotFoundText">Lo sentimos, no hemos encontrado resultados para tu búsqueda, intenta usando otra palabra</p>
                                <img src={notFound}
                                    alt="item"
                                    className="NotFoundImage"
                                />
                            </div>
                        }
                    </div>
                    : <LoadingScreen />
                }
            </div>
        </div>
    )
}

export default ItemsList;