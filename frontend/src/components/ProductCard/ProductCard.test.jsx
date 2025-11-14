import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { wishlistService } from '../../services/wishlistService';

// Mock the ToastContext
vi.mock('../../contexts/ToastContext', () => ({
  useToast: () => ({
    showToast: vi.fn()
  })
}));

describe('ProductCard', () => {
  const mockProduct = {
    code: 'PROD001',
    name: 'Test Product',
    priceInCents: 10000,
    salePriceInCents: 8000,
    rating: 4.5,
    image: 'test-image.jpg'
  };

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render product information correctly', () => {
      render(<ProductCard product={mockProduct} origin="ProductList" />);

      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
      expect(screen.getByText('R$ 80,00')).toBeInTheDocument();
      expect(screen.getByText('4.5')).toBeInTheDocument();
      expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'test-image.jpg');
    });

    it('should render heart icon when origin is ProductList', () => {
      const { container } = render(<ProductCard product={mockProduct} origin="ProductList" />);

      const buttonContainer = container.querySelector('[class*="button-container"]');
      expect(buttonContainer).toBeInTheDocument();
    });

    it('should render X icon when origin is Wishlist', () => {
      const { container } = render(<ProductCard product={mockProduct} origin="Wishlist" />);

      const buttonContainer = container.querySelector('[class*="button-container"]');
      expect(buttonContainer).toBeInTheDocument();
    });

    it('should render correct number of filled stars based on rating', () => {
      render(<ProductCard product={mockProduct} origin="ProductList" />);

      const fullFilledStars = screen.getAllByTestId('full-filled-star');
      const halfFilledStars = screen.getAllByTestId('half-filled-star');
      
      expect(fullFilledStars).toHaveLength(4);
      expect(halfFilledStars).toHaveLength(1);
    });
  });

  describe('Wishlist interactions from ProductList', () => {
    it('should add product to wishlist when heart icon is clicked', () => {
      const { container } = render(<ProductCard product={mockProduct} origin="ProductList" />);

      const heartIcon = container.querySelector('[class*="add-button"]');
      fireEvent.click(heartIcon);

      expect(wishlistService.isInWishlist(mockProduct.code)).toBe(true);
    });

    it('should remove product from wishlist when clicking heart on wishlisted item', () => {
      wishlistService.addToWishlist(mockProduct);

      const { container } = render(<ProductCard product={mockProduct} origin="ProductList" />);

      const heartIcon = container.querySelector('[class*="add-button"]');
      fireEvent.click(heartIcon);

      expect(wishlistService.isInWishlist(mockProduct.code)).toBe(false);
    });
  });

  describe('Wishlist interactions from Wishlist page', () => {
    it('should call onWishlistChange when removing from wishlist', () => {
      const onWishlistChange = vi.fn();
      wishlistService.addToWishlist(mockProduct);

      const { container } = render(
        <ProductCard 
          product={mockProduct} 
          origin="Wishlist" 
          onWishlistChange={onWishlistChange}
        />
      );

      const removeIcon = container.querySelector('[class*="remove-button"]');
      fireEvent.click(removeIcon);

      expect(onWishlistChange).toHaveBeenCalledTimes(1);
      expect(wishlistService.isInWishlist(mockProduct.code)).toBe(false);
    });
  });
});
