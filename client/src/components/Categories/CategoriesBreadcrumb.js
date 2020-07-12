import React from 'react';
import './CategoriesBreadcrumb.scss'

const CategoriesBreadcrumb = ({ categories, ...props }) => {
    if (categories) {
        return (
            <div className="BreadCrumb">
                <ul class="collapsed">
                    {categories.map(category => {
                        return (
                            <li><a href={category.id}>{category.name}</a></li>
                        )
                    })
                    }
                </ul>
            </div>
        )
    } else { return null }
}

export default CategoriesBreadcrumb;