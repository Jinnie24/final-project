import React, { Component } from 'react';
export default class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.sorted = { age: true, name: true };
    }

    sort(type) {
        // с помощью реструктуризации создаём две переменные
        const { update, products } = this.props;
        // получаем порядок сортировки
        const isSorted = this.sorted[type];
        // устанавливаем направление
        let direction = isSorted ? 1 : -1;

        // создаём новый массив из данных, чтобы не перезаписывать
        // состояние и сортируем его
        const sorted = [].slice.call(products).sort((a, b) => {
            // чтобы сортировка всегда была одинаковой учтём все условия
            // функция может вернуть 0, 1 или -1, в зависимости от возвращаемого
            // значения метод массивов sort сделает свой выбор
            if (a[type] === b[type]) { return 0; }
            return a[type] > b[type] ? direction : direction * -1;
        });

        // меняем порядок сортировки
        this.sorted[type] = !isSorted;

        // обновляем состояние
        update({
            products: sorted,
            active: 0
        });
    }
    reset() {
        this.props.update({
            products: this.props.initialproducts,
            term: '',
            active: 0,
            selectedProducts: {},
            selectedImportProducts: {}
        });
    }

    render() {
        return (
            <div className="toolbar">
                <button className="btn btn-default" onClick={() => this.sort('name')}>
                    <i className="glyphicon glyphicon-sort"></i>   Sort by name
                </button>
                <button className="btn btn-default" onClick={() => this.sort('price')}>
                    <i className="glyphicon glyphicon-sort"></i>   Sort by price
                </button>
                <button className="btn btn-danger" onClick={this.reset.bind(this)}>
                    <i className="glyphicon glyphicon-ban-circle"></i>   Reset
                </button>
            </div>
        );
    }
}