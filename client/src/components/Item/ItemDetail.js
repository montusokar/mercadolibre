import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sentry } from 'react-activity';
import 'react-activity/dist/react-activity.css';

import {
    useParams
} from "react-router-dom";

import CategoriesBreadcrumb from '../Categories/CategoriesBreadcrumb'

function ItemDetail() {
    var { itemId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        if (!data.item || data.item.id !== itemId) {
            setIsLoading(true);
            const fetchData = async () => {
                const result = await axios(
                    'http://localhost:9000/api/items/' + itemId,
                );

                setData(result.data);
            };
            fetchData();
            setIsLoading(false);
        }
    }, [data, itemId, setData, setIsLoading]);

    console.log(data);
    if (data.item) {
        let {item} = data; 
        return (<div style={{display: 'grid', justifyContent: 'center'}}>
            <CategoriesBreadcrumb categories={data.item.categories} />
            <div style={{display: 'flex', backgroundColor: 'white', width: 800}}>
            <div>
                    <img
                        src={item.picture}
                        alt="new"
                        style={{ width: 100 }}
                    />
                </div>
                <div>
                    <div style={{ display: 'flex' }}>
                        <p>$</p>
                        <p>{item.price.amount}</p>
                        {item.price.decimals > 0 ? <p>,{item.price.decimals}</p> : null}
                        <p> {item.price.currency}</p>
                    </div>

                    <a style={{
                        color: 'black',
                        fontWeight: 'bold',
                        textDecoration: 'none'
                    }}

                        href={item.id} >{item.title}</a>
                    <p> Condition: {item.condition}</p>
                    <p> Free Shipping: {String(item.free_shipping)}</p>
                    <p> Unidades vendidas: {item.sold_quantity}</p>
                    <p> Description del Producto:</p>
                    <p> {item.description}</p>
                </div>

            </div>
        </div>);
    } else {
        return (<div>
            <Sentry color="#727981" size={20} speed={0.7} animating={true} />
        </div>);
    }

}

export default ItemDetail;