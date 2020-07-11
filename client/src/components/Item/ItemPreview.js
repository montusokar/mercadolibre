import React from 'react';
import history from '../../browser/history'

const ItemPreview = ({ item, ...props }) => {
    if (item) {
        return (
            <div onClick={(event) => history.push('/items/' + item.id)}>
                <a style={{
                    color: 'black',
                    fontWeight: 'bold',
                    textDecoration: 'none'
                }}
                    href={item.id} >{item.title}</a>
            </div>
        )
    } else { return null }

}

export default ItemPreview;