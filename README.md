WeatherClient
Welcome to the WeatherClient repository! This project is designed to provide a seamless and intuitive interface for viewing weather information, specifically for kitesurfing spots. It leverages modern web technologies to create a responsive and interactive user experience.

Features
Progressive Web App (PWA): Offline capabilities and a native app-like experience.
Dynamic Map: Interactive maps displaying kitesurfing spots using Leaflet and React-Leaflet.
Geolocation: Automatically fetches and displays weather information for the user's current location.
Search Functionality: Allows users to search for kitesurfing spots by name.
Responsive Design: Optimized for various screen sizes and devices.
Technologies Used
Next.js: React framework for server-side rendering and static site generation.
React: JavaScript library for building user interfaces.
Tailwind CSS: Utility-first CSS framework for styling.
Leaflet: Open-source JavaScript library for interactive maps.
Axios: Promise-based HTTP client for making API requests.
Font Awesome: Icon library for displaying vector icons.
TypeScript: Typed superset of JavaScript for type safety and enhanced developer experience.
Getting Started
Prerequisites
Node.js (version 14.x or later)
npm (version 6.x or later)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/weatherclient.git
cd weatherclient
Install dependencies:

bash
Copy code
npm install
Running the Development Server
To start the development server, run:

bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000 to view the application.

Building for Production
To build the project for production, run:

bash
Copy code
npm run build
This will create an optimized production build in the .next directory.

Starting the Production Server
To start the production server, run:

bash
Copy code
npm start
Configuration
Tailwind CSS
The Tailwind CSS configuration file is located at tailwind.config.ts. It is set up to scan the pages, components, and app directories for class names.

PWA Configuration
The PWA configuration is set up in next.config.js using next-pwa. It includes settings for caching strategies and service worker registration.

javascript
Copy code
import withPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
};

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})(nextConfig);
Project Structure
components/: Reusable React components.
pages/: Next.js pages.
app/: Application-specific files, including context providers and hooks.
public/: Static files such as images and the service worker.
styles/: Global styles.
hooks/: Custom React hooks.
Environment Variables
Ensure you have a .env.local file in the root directory with the necessary environment variables.

Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue if you have any suggestions or bug reports.

License
This project is licensed under the MIT License.

Acknowledgements
Next.js
React
Tailwind CSS
Leaflet
Axios
