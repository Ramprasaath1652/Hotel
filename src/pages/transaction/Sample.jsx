import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useRef } from 'react'


const Sample = () => {
    console.count("COMPONENT RENDER");

    const [qData, setqData] = useState(null);

    const isLoaded = useRef(false);

    const [productQuery, setProductQuery] = useState('');
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [showProductDropDown, setShowProductDropDown] = useState(false);
    const [highlightedProductIndex, setHighlightedProductIndex] = useState(-1);
    const [productList, setProductList] = useState([]);

    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState('');

    const [addedProducts, setAddedProducts] = useState([]);

    const navigate = useNavigate();

    const goToPageTwo = () => {
        navigate('/transaction/samplepage')
    };
    const { QId } = useParams();

    useEffect(() => {
        loadProduct()
    }, [])

    useEffect(() => {
        if (!QId) return;
        if (isLoaded.current) return;
        isLoaded.current = true;

        const fetchData = async () => {
            await loadQdata(QId);
            await loadProductRows(QId);
        };
        fetchData();

        return () => {
            isLoaded.current = false;
        };
    }, [QId]);


    const loadQdata = async (id) => {
        try {
            const res = await axios.get(`http://192.168.31.101:85/api/quoinfo/${id}`)
            setqData(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const loadProduct = async () => {
        try {
            const res = await axios.get('http://192.168.31.101:85/api/productmasters')
            //console.log("LOAD Product RESPONSE:", res.data);
            setProductList(res.data)
        } catch (err) {
            console.error('product fetching error', err);
            alert('Could not load product. Check API connection.');
        }
    }

    const loadProductRows = async (id) => {
        try {
            const res = await axios.get(
                `http://192.168.31.101:85/api/QuoDetsInfoes?QId=${id}`
            );

            if (!res.data || res.data.length === 0) {
                setAddedProducts([]);
                return;
            }

            const mappedRows = res.data.map((item, index) => ({
                productId: item.ProductID,
                productName: item.ProductName
            }));

            setAddedProducts(mappedRows); // 👈 table rows
        } catch (err) {
            console.error('Product load error', err);
            setAddedProducts([]);
        }
    };


    const handleProductChange = (e) => {
        const value = e.target.value;

        setProductQuery(value);

        if (value.trim() === '') {
            setFilteredProduct([]);
            setShowProductDropDown(false);
            return;
        }

        const filtered = productList.filter(p =>
            p.ProductName?.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredProduct(filtered);
        setShowProductDropDown(true);
        setHighlightedProductIndex(-1);
    };

    const handleProductKeyDown = (e) => {
        if (!showProductDropDown) return;

        if (e.key === 'ArrowDown') {
            setHighlightedProductIndex(prev =>
                Math.min(prev + 1, filteredProduct.length - 1)
            );
        }

        if (e.key === 'ArrowUp') {
            setHighlightedProductIndex(prev =>
                Math.max(prev - 1, 0)
            );
        }

        if (e.key === 'Enter' && highlightedProductIndex >= 0) {
            handleSelectProduct(filteredProduct[highlightedProductIndex]);
        }
    };

    const handleSelectProduct = (item) => {
        setProductId(item.ProductID);
        setProductName(item.ProductName);
        setProductQuery(item.ProductName);
        setShowProductDropDown(false);
    };

    const handleAddProduct = () => {
        if (!productId) return; // product select pannama add panna block

        const newRow = {
            productId: productId,
            productName: productName
        };

        setAddedProducts(prev => [...prev, newRow]);

        // reset input
        setProductId(null);
        setProductName('');
        setProductQuery('');
    };

    const handleReset = () => {
        navigate('/transaction/sample')
        setAddedProducts([]);
        setProductQuery('');
        setProductId(null);
        setProductName('');
        setqData(null);

    };

    return (
        <div>
            <div className='d-flex'>
                <h6>Q.No:</h6> <p>{qData?.QNo}</p>
            </div>

            <div className='d-flex'>
                <h6>Q.Date:</h6> <p>{qData?.QDate}</p>
            </div>

            <div className='d-flex'>
                <h6>Load Product:  </h6> <p>{qData?.ProjName} </p>
            </div>

            <div className='d-flex'>
                <h6>Table Product:</h6> <p>{qData?.LedgerName}</p>
            </div>

            <div
                className="d-flex flex-column align-items-start"
                style={{ width: '200px', position: 'relative' }}
            >
                <label className="form-label mb-1 fw-bold">Product</label>

                <input
                    type="text"
                    className="form-control form-control-sm"
                    value={productQuery}
                    onChange={handleProductChange}
                    onKeyDown={handleProductKeyDown}
                    onFocus={() => setShowProductDropDown(true)}
                    onBlur={() => setTimeout(() => setShowProductDropDown(false), 150)}
                />

                {showProductDropDown && filteredProduct.length > 0 && (
                    <div
                        className="position-absolute bg-white border shadow-sm"
                        style={{
                            top: '100%',
                            left: 0,
                            width: '100%',
                            maxHeight: '200px',
                            overflowY: 'auto',
                            zIndex: 9999
                        }}
                    >
                        <div className="fw-bold border-bottom bg-light px-2 py-1">
                            Product
                        </div>

                        {filteredProduct.map((item, index) => (
                            <div
                                key={item.ProductID}
                                className="px-2 py-1 border-bottom"
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor:
                                        index === highlightedProductIndex
                                            ? '#e9ecef'
                                            : 'white'
                                }}
                                onMouseDown={() => handleSelectProduct(item)}
                            >
                                {item.ProductName}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button
                className="btn btn-sm btn-primary mt-2"
                onClick={handleAddProduct}

            >
                Add
            </button>

            <div>
                <table className="table table-bordered table-sm mt-3" style={{ width: '300px' }}>
                    <thead className="table-light">
                        <tr>
                            <th>Product Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addedProducts.length > 0 ? (
                            addedProducts.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.productName}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center text-muted">
                                    No Products Added
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>

            <div className='d-flex gap-2 mt-2'>
                <button
                    className="btn btn-sm btn-warning mt-2"
                    onClick={handleReset}
                >
                    Reset
                </button>




                <button onClick={goToPageTwo} className='btn btn-sm btn-danger'>
                    Find
                </button>

            </div>




        </div>
    )
}

export default Sample