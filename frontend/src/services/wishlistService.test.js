import { describe, it, expect, beforeEach } from 'vitest';
import { wishlistService } from './wishlistService';

describe('wishlistService', () => {
  const mockProduct1 = {
    code: 'PROD001',
    name: 'Test Product 1',
    priceInCents: 10000,
    salePriceInCents: 8000,
    rating: 4.5,
    image: 'test1.jpg'
  };

  const mockProduct2 = {
    code: 'PROD002',
    name: 'Test Product 2',
    priceInCents: 15000,
    salePriceInCents: 12000,
    rating: 4.0,
    image: 'test2.jpg'
  };

  beforeEach(() => {
    localStorage.clear();
  });

  describe('getWishlist', () => {
    it('should return an empty array when wishlist is empty', () => {
      const wishlist = wishlistService.getWishlist();
      expect(wishlist).toEqual([]);
    });

    it('should return stored wishlist items', () => {
      localStorage.setItem('wishlist', JSON.stringify([mockProduct1, mockProduct2]));
      const wishlist = wishlistService.getWishlist();
      expect(wishlist).toHaveLength(2);
      expect(wishlist[0].code).toBe('PROD001');
      expect(wishlist[1].code).toBe('PROD002');
    });
  });

  describe('addToWishlist', () => {
    it('should successfully add a product to an empty wishlist', () => {
      const result = wishlistService.addToWishlist(mockProduct1);
      
      expect(result.success).toBe(true);
      expect(result.wishlist).toHaveLength(1);
      expect(result.wishlist[0].code).toBe('PROD001');
      
      const stored = JSON.parse(localStorage.getItem('wishlist'));
      expect(stored).toHaveLength(1);
      expect(stored[0].code).toBe('PROD001');
    });

    it('should prevent adding duplicate products', () => {
      wishlistService.addToWishlist(mockProduct1);
      const result = wishlistService.addToWishlist(mockProduct1);
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Product already in wishlist');
      expect(result.wishlist).toHaveLength(1);
    });
  });

  describe('removeFromWishlist', () => {
    beforeEach(() => {
      wishlistService.addToWishlist(mockProduct1);
      wishlistService.addToWishlist(mockProduct2);
    });

    it('should successfully remove a product from wishlist', () => {
      const result = wishlistService.removeFromWishlist('PROD001');
      
      expect(result.success).toBe(true);
      expect(result.wishlist).toHaveLength(1);
      expect(result.wishlist[0].code).toBe('PROD002');
    });

    it('should update localStorage after removal', () => {
      wishlistService.removeFromWishlist('PROD001');
      
      const stored = JSON.parse(localStorage.getItem('wishlist'));
      expect(stored).toHaveLength(1);
      expect(stored[0].code).toBe('PROD002');
    });
  });

  describe('isInWishlist', () => {
    beforeEach(() => {
      wishlistService.addToWishlist(mockProduct1);
    });

    it('should return true if product exists in wishlist', () => {
      const exists = wishlistService.isInWishlist('PROD001');
      expect(exists).toBe(true);
    });

    it('should return false if product does not exist in wishlist', () => {
      const exists = wishlistService.isInWishlist('PROD999');
      expect(exists).toBe(false);
    });
  });
});
