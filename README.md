# Order Management System

This project is an Order Management System built with Vue.js and PrimeVue components. It allows users to manage orders, including creating, updating, and viewing order details.

## Demo

[Watch the demo ](https://drive.google.com/file/d/1al9mecSHsVhJRY07-lXfnyvx58qYkZCj/view?usp=sharing)

[View Live Demo](https://orders-management-phi.vercel.app/login)

<!-- Add your video demo embed code here -->

## Repository

[GitHub Repository](https://github.com/Mhmd3ssam/Orders-Management)

## Features

- User Authentication
- Order Creation and Management
- Order Status Tracking
- Responsive Design

## Project Structure

```
src/
├── assets/
├── components/
├── helpers/
├── locale/
├── modules/
│   ├── Auth/
│   └── Orders/
│       ├── OrderDetails.vue
│       ├── OrderForm.vue
│       ├── orders.route.js
│       ├── Orders.vue
│       └── WrapperOrders.vue
├── plugins/
├── router/
├── services/
├── store/
├── App.vue
├── main.ts
└── style.css
```

## Technologies Used

- Vue.js 3
- Vite
- PrimeVue
- Tailwind CSS
- Pinia
- Vue Router
- Axios
- Vuelidate
- Vue I18n

## Getting Started

### Prerequisites

- Node.js (latest LTS version)
- npm or yarn
- PocketBase (for backend)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/Mhmd3ssam/Orders-Management.git
   cd Orders-Management
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add necessary environment variables.

4. Run the development server:
   ```
   npm run dev
   ```

### Setting up PocketBase

1. Install and set up PocketBase
2. Create a new database with the following modules:

   - `orders` with fields:
     - `product_name`
     - `quantity`
     - `price`
     - `status` (relation to `status` module)
   - `status` with options:
     - pending
     - paid
     - canceled

3. Use the following credentials for testing:
   - Email: mohamedammar.essam95@gmail.com
   - Password: 1234567890

## Available Scripts

- `npm run dev`: Run the development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Lint and fix files
- `npm run format`: Format files with Prettier

## Deployment

The frontend is deployed on Vercel. The backend is not yet hosted.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For any questions or concerns, please contact:

- Email: mohamedammar.essam95@gmail.com

## License

This project is open source and available under the [MIT License](LICENSE).
