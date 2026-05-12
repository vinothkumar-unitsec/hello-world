import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from './services/productService';

const PAGE_SIZE = 15;

function getAvailabilityColor(status) {
  if (status === 'Low Stock') return 'red';
  if (status === 'In Stock') return 'green';
  return 'inherit';
}

function MainPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const paginated = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'whitesmoke' }}>

      {/* Header */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: '#2c3e50', color: 'white', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>Products Dashboard</h2>
        <Link to="/" style={{ color: 'white', textDecoration: 'underline' }}>Main Page</Link>
      </header>

      {/* Content */}
      <main style={{ flex: 1, padding: '32px', marginTop: '64px', marginBottom: '56px' }}>
        <h3>Product List</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <thead>
                <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                  <th style={th}>ID</th>
                  <th style={th}>Category</th>
                  <th style={th}>Price ($)</th>
                  <th style={th}>Availability</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((product, index) => (
                  <tr key={product.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                    <td style={td}>{product.id}</td>
                    <td style={td}>{product.category}</td>
                    <td style={td}>{product.price}</td>
                    <td style={{ ...td, color: getAvailabilityColor(product.availabilityStatus) }}>
                      {product.availabilityStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
              <button style={btnStyle} onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  style={{ ...btnStyle, backgroundColor: page === currentPage ? '#2c3e50' : '#e0e0e0', color: page === currentPage ? 'white' : '#333' }}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              <button style={btnStyle} onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, backgroundColor: '#2c3e50', color: 'white', padding: '16px 32px', textAlign: 'center' }}>
        <p style={{ margin: 0 }}>© 2026 Claude Code. All rights reserved.</p>
      </footer>

    </div>
  );
}

const th = { padding: '12px 16px', textAlign: 'left', fontWeight: 'bold' };
const td = { padding: '10px 16px', borderBottom: '1px solid #ddd' };
const btnStyle = { padding: '6px 12px', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#e0e0e0', color: '#333' };

export default MainPage;
