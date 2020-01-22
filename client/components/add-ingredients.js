import React from 'react'

const AddIngredients = props => {
  const showAddingIngredients = props.ingredients.slice(props.startPoint)
  return (
    <div>
      {showAddingIngredients.map((ingredient, indx) => (
        <div key={indx}>
          <select name="name" onChange={props.handleChange}>
            {props.products.map((product, idx) => (
              <option
                key={product.id}
                value={
                  product.name +
                  '*' +
                  product.id +
                  '*' +
                  (indx + props.startPoint)
                }
              >
                {product.name}
              </option>
            ))}
          </select>
          <div className="weightquantity">
            <div>
              <label htmlFor="weight">
                <small>Weight:</small>
              </label>
              <input
                name="weight"
                type="text"
                value={ingredient.weight}
                size={indx + 1 + props.startPoint}
                onChange={props.handleChange}
              />
            </div>
            <div>
              <label htmlFor="quantity">
                <small>Quantity:</small>
              </label>
              <input
                name="quantity"
                type="text"
                size={indx + 1 + props.startPoint}
                value={ingredient.quantity}
                onChange={props.handleChange}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AddIngredients
