import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [productCode, setProductCode] = useState('');
    const [productName, setProductName] = useState('');
    const [groupName, setGroupName] = useState('');
    const [salesUnit, setSalesUnit] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Insert or Update
    const handleInsertOrUpdate = () => {
        if (!productCode.trim() || !productName.trim()) {
            alert('Please enter Product Code and Product Name');
            return;
        }

        const newProduct = {
            productCode: productCode.trim(),
            productName: productName.trim(),
            groupName: groupName.trim(),
            salesUnit: salesUnit.trim(),
        };

        if (editingIndex !== null) {
            const updatedProducts = [...products];
            updatedProducts[editingIndex] = newProduct;
            setProducts(updatedProducts);
            setEditingIndex(null);
        } else {
            setProducts([...products, newProduct]);
        }

        setProductCode('');
        setProductName('');
        setGroupName('');
        setSalesUnit('');
    };

    // Edit
    const handleEdit = (index) => {
        const prod = products[index];
        setProductCode(prod.productCode);
        setProductName(prod.productName);
        setGroupName(prod.groupName);
        setSalesUnit(prod.salesUnit);
        setEditingIndex(index);
    };

    // Delete
    const handleDelete = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        if (editingIndex === index) {
            setEditingIndex(null);
            setProductCode('');
            setProductName('');
            setGroupName('');
            setSalesUnit('');
        }
    };

    // Filtered data for search
    const filteredProducts = products.filter((item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid mt-2">
            <div className="card shadow-lg mx-auto" style={{ maxWidth: '95%', border: '2px solid #5d8aa8' }}>
                {/* Header */}
                <div className="card-header text-white" style={{ backgroundColor: '#5d8aa8', padding: '20px' }}>
                    <h4 className="mb-0">Product</h4>
                </div>

                {/* Body */}
                <div className="card-body" style={{ height: 'calc(100vh - 200px)', overflow: 'auto' }}
 >
                    <div className="row">
                        {/* Left - Form */}
                        <div className="col-md-4">
                            <h5 className="mb-3">{editingIndex !== null ? 'Edit Product' : 'Add Product'}</h5>

                            <div className="mb-3">
                                <label className="form-label">Product Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter product code"
                                    value={productCode}
                                    onChange={(e) => setProductCode(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Product Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter product name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Group Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter group name"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Sales Unit</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter sales unit"
                                    value={salesUnit}
                                    onChange={(e) => setSalesUnit(e.target.value)}
                                />
                            </div>

                            <button className="btn btn-primary btn-sm" onClick={handleInsertOrUpdate}>
                                {editingIndex !== null ? 'Update' : 'Insert'}
                            </button>
                        </div>

                        {/* Right - Table */}
                        <div className="col-md-8">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0">Product List</h5>
                                <input
                                    type="text"
                                    className="form-control w-50"
                                    placeholder="Search Products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {filteredProducts.length === 0 ? (
                                <p className="text-center text-muted">No records found.</p>
                            ) : (
                                <div
                                  style={{ maxHeight: 'calc(100vh - 350px)', overflowY: 'auto',overflowX: 'auto'}}

                                >
                                    <table className="table table-bordered table-striped text-center align-middle">
                                        <thead className="table-light" style={{ position: 'sticky', top: 0 }}>
                                            <tr>
                                                <th>Product Code</th>
                                                <th>Product Name</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.productCode}</td>
                                                    <td>{item.productName}</td>
                                                    <td>
                                                        <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index)}>
                                                            Edit
                                                        </button>
                                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
