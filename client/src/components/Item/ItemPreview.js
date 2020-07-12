import React from 'react';
import history from '../../browser/history'
import './ItemPreview.scss'

const ItemPreview = ({ item, ...props }) => {
    console.log(item);
    if (item) {
        return (
            <div onClick={(event) => history.push('/items/' + item.id)} className="PreviewContainer">
                <div className="ImagePreviewContainer">
                    <img
                        src={item.picture}
                        alt="item"
                        className="ImagePreview"
                        resizeMode='cover'
                    />
                </div>
                <div className="DetailsPreviewContainer">
                    <div className="ItemPrice">
                        <p className="ItemPriceText">$</p>
                        <p>{item.price.amount}</p>
                        {item.price.decimals > 0 ? <p>,{item.price.decimals}</p> : null}
                        <p className="Currency">{"  " + item.price.currency}</p>
                    </div>

                    <a className="ItemTitle"
                        href={item.id} >{item.title}
                    </a>

                    <div className="ItemConditions">
                        <p className="ItemCondition"> Condición: {item.condition === 'new' ? 'nuevo' : item.condition === 'used' ? 'usado' : item.condition}</p>
                        {item.free_shipping ? <p className="ItemFreeShipping">Envío gratis</p> : null}
                    </div>

                </div>
            </div>
        )
    } else { return null }

}

export default ItemPreview;