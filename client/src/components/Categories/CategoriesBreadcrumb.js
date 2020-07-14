import React from 'react';
import './CategoriesBreadcrumb.scss'

const CategoriesBreadcrumb = ({ categories, ...props }) => {
    if (categories) {
        return (
            <div className="BreadCrumb">
                <ul className="collapsed">
                    {categories.map(category => {
                        return (
                            <li key={category.id}><a href={category.id}>{category.name}</a></li>
                        )
                    })
                    }
                </ul>
            </div>
        )
    } else { return null }
}

export default CategoriesBreadcrumb;