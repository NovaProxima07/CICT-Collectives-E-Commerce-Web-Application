import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { AuthProvider } from "./context/AuthContext";  // Import your AuthContext

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AuthProvider>  {/* Wrap App with AuthProvider for authentication */}
			<ShopContextProvider>
				<App />
			</ShopContextProvider>
		</AuthProvider>
	</BrowserRouter>
);