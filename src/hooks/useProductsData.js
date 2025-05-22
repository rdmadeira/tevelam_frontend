import React from 'react';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';

import useAxios from './useAxios';
import * as userActions from '../redux/user/userActions';
import StockComp from '../components/StockComponent.jsx';

const useProductsData = () => {
  const user = useSelector((state) => state.user);
  const [productsData, setProductsData] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(true);

  const axiosInstance = useAxios(user || { clientId: null, credential: null });
  const reduxdispatch = useDispatch();

  React.useEffect(() => {
    const queryObj = queryString.parse(window.location.search);

    const entidad = `products/?empresa=${queryObj.focus || 'tevelam'}&iscurrent=true`;

    user &&
      axiosInstance
        .get(entidad)
        .then((value) => {
          const data = value.data.data;

          const dataGrid = {
            columns: [
              {
                renderCell: (params) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      whiteSpace: 'normal', // 👈 permite múltiples líneas
                      wordWrap: 'break-word',
                      lineHeight: 1.4,
                      fontSize: 'min(1.2vw, 15px)',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}>
                    {params.value}
                  </div>
                ),
                field: 'codigo',
                headerName: 'Código',
                flex: 1.2,
              },
              {
                renderCell: (params) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      whiteSpace: 'normal', // 👈 permite múltiples líneas
                      wordWrap: 'break-word',
                      lineHeight: 1.4,
                      fontSize: 'min(1.2vw, 15px)',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}>
                    {params.value}
                  </div>
                ),
                field: 'marca',
                headerName: 'Marca',
                flex: 1.2,
              },
              {
                renderCell: (params) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      whiteSpace: 'normal', // 👈 permite múltiples líneas
                      wordWrap: 'break-word',
                      lineHeight: 1.4,
                      fontSize: 'min(1.2vw, 15px)',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}>
                    {params.value}
                  </div>
                ),
                field: 'rubro',
                headerName: 'Rubro',
                flex: 1.2,
              },
              {
                renderCell: (params) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      whiteSpace: 'normal', // 👈 permite múltiples líneas
                      wordWrap: 'break-word',
                      lineHeight: 1.4,
                      fontSize: 'min(1.2vw, 15px)',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}>
                    {params.value}
                  </div>
                ),
                field: 'modelo',
                headerName: 'Modelo',
                flex: 1.2,
              },
              {
                renderCell: (params) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      whiteSpace: 'normal', // 👈 permite múltiples líneas
                      wordWrap: 'break-word',
                      lineHeight: 1.4,
                      fontSize: 'min(1.2vw, 15px)',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}>
                    {params.value}
                  </div>
                ),
                field: 'iva',
                headerName: 'IVA',
                flex: 0.8,
              },
              {
                field: 'stock',
                headerName: 'Stock',
                align: 'center',
                flex: 1,
                renderCell: (params) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      whiteSpace: 'normal', // 👈 permite múltiples líneas
                      wordWrap: 'break-word',
                      lineHeight: 1.4,
                      fontSize: 'min(1.2vw, 15px)',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}>
                    <StockComp stock={params.value} />
                  </div>
                ),
                valueFormatter: (params) => {
                  return params > 5
                    ? 'Mayor a 5'
                    : params <= 5 && params > 0
                      ? 'Menor a 5'
                      : 'Sin Stock';
                },
              },
              {
                field: 'cant',
                headerName: 'Cant.',
                flex: 0.7,
                editable: true,
                type: 'number',
                align: 'center',
              },
              {
                renderCell: (params) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      whiteSpace: 'normal', // 👈 permite múltiples líneas
                      wordWrap: 'break-word',
                      lineHeight: 1.4,
                      fontSize: 'min(1.2vw, 15px)',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}>
                    {params.value}
                  </div>
                ),
                field: 'pvc',
                headerName: 'PVC',
                flex: 1,
              },
              {
                renderCell: (params) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      whiteSpace: 'normal', // 👈 permite múltiples líneas
                      wordWrap: 'break-word',
                      lineHeight: 1.4,
                      fontSize: 'min(1.2vw, 15px)',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}>
                    {params.value}
                  </div>
                ),
                field: 'pvp_c',
                headerName: 'PVP Clásico',
                flex: 1,
              },
              {
                renderCell: (params) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                      whiteSpace: 'normal', // 👈 permite múltiples líneas
                      wordWrap: 'break-word',
                      lineHeight: 1.4,
                      fontSize: 'min(1.2vw, 15px)',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                    }}>
                    {params.value}
                  </div>
                ),
                field: 'pvp_p',
                headerName: 'PVP Premium',
                flex: 1,
              },
            ],
            rows: [],
          };
          data.forEach((item) => {
            const stockDeProducto = item.codigo_red
              .map((item) => item.stock_dis)
              .reduce((a, b) => a + b, 0);

            dataGrid.rows.push({
              id: item.id,
              codigo: item.codigo_red[0].codigo,
              marca: item.Marca.marca,
              rubro: item.rubro,
              modelo: item.nombre,
              iva: new Intl.NumberFormat('es-AR', {
                style: 'percent',
                maximumFractionDigits: 2,
                minimumFractionDigits: 1,
              }).format(item.tasa_iva),
              stock: stockDeProducto,
              cant: 0,
              pvc:
                '$ ' +
                new Intl.NumberFormat('es-AR', {
                  currency: 'ARG',
                }).format(item.precio_arg),
              pvp_c:
                '$ ' +
                new Intl.NumberFormat('es-AR', {
                  currency: 'ARG',
                  maximumFractionDigits: 0,
                }).format(item.precio_arg * (1 + item.tasa_iva) * 1.25),
              pvp_p:
                '$ ' +
                new Intl.NumberFormat('es-AR', {
                  currency: 'ARG',
                  maximumFractionDigits: 0,
                }).format(item.precio_arg * (1 + item.tasa_iva) * 1.25 * 1.3),
            });
          });

          setProductsData(dataGrid);
          setisLoading(false);
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            reduxdispatch(userActions.signOutAction());
          }
          if (error?.code === 'ERR_NETWORK') {
            console.log('error', error);

            throw new Error(`Error 503: Server Unavailable.
                      Code: ${error.code}
                      Message: ${error.message}`);
          }
        });
  }, [user, axiosInstance, reduxdispatch]);

  return { productsData, isLoading };
};

export default useProductsData;
