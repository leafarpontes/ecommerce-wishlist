const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
  try {
    // throw new Error('Simulated fetch error'); // Simulate an error for testing
    const response = await fetch(`${API_BASE_URL}/products`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { success: true, data: data.products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, error: error.message };
  }
};