import React from 'react';
import { Box } from '@mui/material';
import FilterComponent from './FilterComponent.jsx';
import { useSelector } from 'react-redux';

const FilterContainer = ({ products }) => {
  const [itemsToSelect, setItemsToSelect] = React.useState({
    marcas: [],
    rubro: [],
    modelo: [],
    stock: ['Mayor a 5', 'Menor a 5', 'Sin Stock'],
  });
  const carrito = useSelector((store) => store.carrito);
  const filterValues = useSelector((store) => store.filter);

  React.useEffect(() => {
    const productsToSelectState = {
      marcas: [],
      rubro: [],
      modelo: [],
      stock: ['Mayor a 5', 'Menor a 5', 'Sin Stock'],
      cant: [0],
    };
    products.forEach((prod) => {
      !productsToSelectState.marcas.find(
        (marca) => marca === prod.Marca.marca,
      ) && productsToSelectState.marcas.push(prod.Marca.marca);
      !productsToSelectState.rubro.find((rubro) => rubro === prod.rubro) &&
        productsToSelectState.rubro.push(prod.rubro);
      !productsToSelectState.modelo.find((modelo) => modelo === prod.nombre) &&
        productsToSelectState.modelo.push(prod.nombre);
    });
    carrito.forEach((carItem) => {
      !productsToSelectState.cant.find(
        (cantidad) => cantidad === carItem.cant,
      ) && productsToSelectState.cant.push(carItem.cant);
    });

    setItemsToSelect({
      ...productsToSelectState,
    });
  }, [products, carrito, setItemsToSelect]);

  return (
    <Box sx={{ display: 'flex' }}>
      <FilterComponent
        column={'Marca'}
        itemsToSelect={itemsToSelect.marcas}
        value={filterValues.marcas}
      />
      <FilterComponent
        column={'Rubro'}
        itemsToSelect={itemsToSelect.rubro}
        value={filterValues.rubro}
      />
      <FilterComponent
        column={'Modelo'}
        itemsToSelect={itemsToSelect.modelo}
        value={filterValues.modelo}
      />
      <FilterComponent
        column={'Stock'}
        itemsToSelect={itemsToSelect.stock}
        value={filterValues.stock}
      />
      <FilterComponent
        column={'Cant'}
        itemsToSelect={itemsToSelect.cant}
        value={filterValues.cant}
      />
    </Box>
  );
};

export default FilterContainer;
