Backend API for Product & Order Management
This Node.js backend application provides RESTful APIs for managing products, orders, and user authentication with role-based access control.

Features Overview
1.Node.js and Express.js for building server logic and API endpoints
2.MongoDB with Mongoose for database schema, data modeling, and operations
3.JWT (JSON Web Tokens) for secure user authentication and session management
3.Role-Based Access Control to differentiate Admin and Customer permissions
4.Data Validation on all inputs to prevent invalid data entry
5.Graceful error handling with descriptive messages and proper HTTP status codes
6.Consistent REST API design for clear communication with frontend clients

API Endpoints
1.Authentication: Register, Login with JWT token issuance
2.Products: CRUD operations protected by authentication and admin roles
3.Orders: Create, read, and manage orders with user-specific access
4.User Management: Role assignment and user profile access

Technologies Used
Node.js (v14+)
Express.js framework
MongoDB database
Mongoose ODM
JWT for token-based authentication
Middleware for authentication and role authorization
