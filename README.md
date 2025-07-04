  <h1>📊 Stock Market REST API (Node.js + Express)</h1>

  <p>This is a RESTful API for a stock market app with user authentication, stock price data (via Alpha Vantage API), and watchlist management.</p>

  <h2>🚀 Features</h2>
  <ul>
    <li>User Registration, Login, Logout</li>
    <li>JWT Authentication Middleware</li>
    <li>Forgot & Reset Password via Email (Nodemailer)</li>
    <li>Get live stock prices (via Alpha Vantage)</li>
    <li>Compare multiple stock prices</li>
    <li>Watchlist support (add, remove, get)</li>
  </ul>

  <h2>📁 Folder Structure</h2>
  <pre><code>project/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
├── .env
├── app.js
</code></pre>

  <h2>⚙️ Installation</h2>
  <pre><code>git clone https://github.com/yourname/stock-api
cd stock-api
npm install
</code></pre>

  <h2>🔐 Environment Variables (.env)</h2>
  <pre><code>PORT=5000
MONGODB_URI=mongodb://localhost:27017/stockapi
JWT_SECRET=your_jwt_secret

# SMTP (Gmail or SendGrid)
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_app_password

# Frontend link for reset password page
FRONTEND_URL=http://localhost:3000

# Alpha Vantage API key
ALPHA_VANTAGE_KEY=your_api_key
</code></pre>

  <h2>📦 Start the Server</h2>
  <pre><code>npm start</code></pre>

  <h2>🔗 API Endpoints</h2>

  <h3>Auth Routes</h3>
  <ul>
    <li><code>POST /api/auth/register</code> – Register</li>
    <li><code>POST /api/auth/login</code> – Login</li>
    <li><code>GET /api/auth/logout</code> – Logout</li>
    <li><code>GET /api/auth/profile</code> – User Profile</li>
    <li><code>POST /api/auth/forgot-password</code> – Request Password Reset</li>
    <li><code>POST /api/auth/reset-password/:token</code> – Reset Password</li>
  </ul>

  <h3>User Routes</h3>
  <ul>
    <li><code>PUT /api/user/update</code> – Update user</li>
    <li><code>DELETE /api/user/delete</code> – Delete user</li>
  </ul>

  <h3>Stock Routes</h3>
  <ul>
    <li><code>GET /api/stocks/price/:symbol</code> – Get live price</li>
    <li><code>POST /api/stocks/compare</code> – Compare multiple stocks</li>
  </ul>

  <h3>Watchlist Routes</h3>
  <ul>
    <li><code>POST /api/watchlist/add</code> – Add symbol</li>
    <li><code>DELETE /api/watchlist/remove</code> – Remove symbol</li>
    <li><code>GET /api/watchlist</code> – Get user's watchlist</li>
  </ul>

  <h2>🛠 Tech Stack</h2>
  <ul>
    <li><strong>Backend:</strong> Node.js, Express</li>
    <li><strong>Database:</strong> MongoDB (Mongoose)</li>
    <li><strong>Authentication:</strong> JWT</li>
    <li><strong>Email:</strong> Nodemailer</li>
    <li><strong>Stock API:</strong> Alpha Vantage</li>
  </ul>

  <h2>📧 Contact</h2>
  <p>Made by <strong>yourname</strong> – you@example.com</p>
