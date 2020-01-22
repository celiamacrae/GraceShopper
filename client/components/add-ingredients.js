import React from 'react'

const AddIngredients = props => {
  return (
    <div>
      <select name="ingredients">
        {props.products.map(product => (
          <option
            key={product.id}
            value={product.name}
            onChange={this.handleChange}
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
          <input name="weight" type="text" onChange={props.handleChange} />
        </div>
        <div>
          <label htmlFor="quantity">
            <small>Quantity:</small>
          </label>
          <input name="quantity" type="text" onChange={props.handleChange} />
        </div>
      </div>
    </div>
  )
}

export default AddIngredients
