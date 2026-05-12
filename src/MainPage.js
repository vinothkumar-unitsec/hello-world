import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, []);

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
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <thead>
              <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                <th style={th}>ID</th>
                <th style={th}>Category</th>
                <th style={th}>Price ($)</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' }}>
                  <td style={td}>{product.id}</td>
                  <td style={td}>{product.category}</td>
                  <td style={td}>{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default MainPage;
