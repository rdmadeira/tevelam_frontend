import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useProductsData from '../hooks/useProductsData';

export default function BasicExampleDataGrid() {
  const { productsData, isLoading } = useProductsData();

  return (
    productsData && (
      <div style={{ width: '100%' }}>
        <DataGrid
          rows={productsData?.rows}
          columns={productsData?.columns}
          loading={isLoading}
          showToolbar
        />
      </div>
    )
  );
}
