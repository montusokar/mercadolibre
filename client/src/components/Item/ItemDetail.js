import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dots } from 'react-activity';
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
        setIsLoading(true);
        const fetchData = async () => {
            const result = await axios(
                'http://localhost:9000/api/items/' + itemId,
            );
            console.log(data);
            setData(result.data);
        };
        fetchData();
        setIsLoading(false);
    }, [data, itemId, setData, setIsLoading]);

    return (<div className='ItemDetail-class'>
        {isLoading ? <Dots /> : <p>{data.item ?  <CategoriesBreadcrumb categories={data.item.categories} /> : <Dots />}</p>}
    </div>)
}

export default ItemDetail;