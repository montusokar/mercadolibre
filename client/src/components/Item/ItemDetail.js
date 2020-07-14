import React, { useState, useEffect } from 'react';
import axios from 'axios';
import notFound from '../../assets/images/not-found.png';
import 'react-activity/dist/react-activity.css';
import './ItemDetail.scss'
import './ItemGeneralStyles.scss'

import {
    useParams
} from "react-router-dom";
import { Helmet } from "react-helmet";

import CategoriesBreadcrumb from '../Categories/CategoriesBreadcrumb'
import LoadingScreen from '../Animations/LoadingScreen'

function ItemDetail() {
    var { itemId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const url = process.env.REACT_APP_ITEM_URL;

    useEffect(() => {
        if (!isLoading) {
            let previous = null;
            if (data.item) previous = data.item.id;
            if (!previous || itemId !== previous) {
                setError("");
                if (!error || error === "") {
                    setIsLoading(true);
                    const fetchData = async () => {
                        const result = await axios.get(
                            url + itemId,
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
                }
            }
        }
        setError(data.error ? data.error : "")
        if (error || data.item) setIsLoading(false);
    }, [data, error, isLoading, itemId, setData, setIsLoading, url]);

    if (!error) {
        if (!isLoading && data.item) {
            let { item } = data;
            return (
                <div className="ItemDetailContainer">
                    <Helmet>
                        <html lang="en" />
                        <title>Mercadolibre: {item.title}</title>
                        <meta name="description" content={item.description} />
                    </Helmet>
                    <div>
                        <CategoriesBreadcrumb categories={data.item.categories} />
                        <div className="ItemContainer">
                            <div className="ItemImageConditions">
                                <div className="ItemDetailImageContainer">
                                    <div className="ImageContainer">
                                        <img
                                            src={item.picture}
                                            alt="item"
                                            resizeMode='cover'
                                            className="ItemDetailImage"
                                        />
                                    </div>
                                    <div className="ItemDescription">
                                        <p> Description del Producto:</p>
                                        <p> {item.description}</p>
                                    </div>
                                </div>
                                <div className="ItemConditionsContainer">
                                    <p className="ItemTitle"
                                    >{item.title}
                                    </p>
                                    <div className="ItemPriceDetail">
                                        <p className="ItemPriceTextDetail">$</p>
                                        <p className="ItemPriceTextDetail">{item.price.amount}</p>
                                        {item.price.decimals > 0 ? <p className="ItemPriceTextDetail">,{item.price.decimals}</p> : null}
                                        <p className="Currency">{"  " + item.price.currency}</p>
                                    </div>
                                    <div className="ItemConditions">
                                        <p className="ItemCondition"> Condición: {item.condition === 'new' ? 'nuevo' : item.condition === 'used' ? 'usado' : item.condition}</p>
                                        {item.free_shipping ? <p className="ItemFreeShipping">Envío gratis</p> : null}
                                        <p className="ItemCondition"> Unidades vendidas: {item.sold_quantity}</p>
                                    </div>
                                    <a href="/buy" className="BuyButton">Comprar</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>);
        } else {
            return (<LoadingScreen />);
        }
    } else {
        return (
            <div className="ItemDetailContainer">
                <div className="NotFoundContainer">
                    <p className="NotFoundText">Lo sentimos, no hemos encontrado resultados para este producto</p>
                    <img src={notFound}
                        alt="item"
                        resizeMode='cover'
                        className="NotFoundImage"
                    />
                </div>
            </div>)
    }

}



export default ItemDetail;