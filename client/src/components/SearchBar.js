import React from 'react';

export default ({ term, products, update }) => {

    const productsSearch = e => {
        const value = e.target.value.toLowerCase();

        const filter = products.filter(product => {
            return product.name.toLowerCase().includes(value);
        });

        update({
            products: filter,
            active: 0,
            term: value
        });

    };

    return (
        <div className="searchbar form-group">
            <input
                value={term}
                type="text"
                className="form-control"
                placeholder="Search product by name..."
                onChange={productsSearch}
            />
        </div>
    );
};