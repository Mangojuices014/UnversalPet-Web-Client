import React from 'react'

const ProductFilter = (
    label,
    values = [],
    selectedValue,
    onSelectedValue,
    onClearFilters,
) => {
    return (
        <InputGroup>
            <Form.Select
                className='form-control'
                value={selectedValue}
                onChange={(e) => onSelectedValue(e.target.value)}>
                <option value=''>...Select {label.toLowerCase()}...</option>
                {values.map((value, index) => (
                    <option key={index} value={value}>
                        {value}
                    </option>
                ))}
            </Form.Select>
            <Button variant='secondary' onClick={onClearFilters}>
                Clear Filter
            </Button>
        </InputGroup>
    )
}

export default ProductFilter