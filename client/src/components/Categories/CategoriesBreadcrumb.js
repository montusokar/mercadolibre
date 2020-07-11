import React from 'react';

const CategoriesBreadcrumb = ({ categories, ...props }) => {
    if (categories) {
        return (
            <li style={{ display: 'flex', marginRight: 15 }} className='breadcrumb-item' {...props}>
                {categories.map(category => {
                    return (
                        <div>
                            <a
                                style={{
                                    color: 'gray',
                                    textDecoration: 'none'
                                }}
                                href={category.id}>{category.name}</a>
                        </div>)
                })
                }
            </li>
        )
    } else { return null }

}

export default CategoriesBreadcrumb;