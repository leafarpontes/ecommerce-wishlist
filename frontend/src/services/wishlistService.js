const WISHLIST_KEY = 'wishlist';

export const wishlistService = {
  getWishlist: () => {
    try {
      const wishlist = localStorage.getItem(WISHLIST_KEY);
      return wishlist ? JSON.parse(wishlist) : [];
    } catch (error) {
      console.error('Error reading wishlist from localStorage:', error);
      return [];
    }
  },

  addToWishlist: (product) => {
    try {
      const wishlist = wishlistService.getWishlist();

      const exists = wishlist.some(item => item.code === product.code);
      
      if (!exists) {
        wishlist.push(product);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
        return { success: true, wishlist };
      }
      
      return { success: false, message: 'Product already in wishlist', wishlist };
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return { success: false, error: error.message };
    }
  },

  removeFromWishlist: (productCode) => {
    try {
      const wishlist = wishlistService.getWishlist();
      const updatedWishlist = wishlist.filter(item => item.code !== productCode);
      
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
      return { success: true, wishlist: updatedWishlist };
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return { success: false, error: error.message };
    }
  },

  isInWishlist: (productCode) => {
    const wishlist = wishlistService.getWishlist();
    return wishlist.some(item => item.code === productCode);
  }
};
