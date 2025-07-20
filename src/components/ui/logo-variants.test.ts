import { describe, it, expect } from 'vitest';
import { logoVariants } from './logo';

describe('logoVariants', () => {
  describe('Base classes', () => {
    it('should include base classes for all variants', () => {
      const result = logoVariants();
      expect(result).toContain('rounded');
      expect(result).toContain('object-contain');
      expect(result).toContain('transition-opacity');
      expect(result).toContain('duration-200');
    });
  });

  describe('Size variants', () => {
    it('should apply sm size classes', () => {
      const result = logoVariants({ size: 'sm' });
      expect(result).toContain('h-8');
      expect(result).toContain('w-auto');
    });

    it('should apply default size classes when no size specified', () => {
      const result = logoVariants();
      expect(result).toContain('h-10');
      expect(result).toContain('w-auto');
    });

    it('should apply lg size classes', () => {
      const result = logoVariants({ size: 'lg' });
      expect(result).toContain('h-12');
      expect(result).toContain('w-auto');
    });

    it('should apply xl size classes', () => {
      const result = logoVariants({ size: 'xl' });
      expect(result).toContain('h-16');
      expect(result).toContain('w-auto');
    });
  });

  describe('Spacing variants', () => {
    it('should apply no spacing classes for none variant', () => {
      const result = logoVariants({ spacing: 'none' });
      expect(result).not.toContain('pr-2');
      expect(result).not.toContain('pr-4');
      expect(result).not.toContain('pr-6');
    });

    it('should apply default spacing classes when no spacing specified', () => {
      const result = logoVariants();
      expect(result).toContain('pr-4');
    });

    it('should apply sm spacing classes', () => {
      const result = logoVariants({ spacing: 'sm' });
      expect(result).toContain('pr-2');
    });

    it('should apply lg spacing classes', () => {
      const result = logoVariants({ spacing: 'lg' });
      expect(result).toContain('pr-6');
    });
  });

  describe('Combined variants', () => {
    it('should combine size and spacing variants correctly', () => {
      const result = logoVariants({ size: 'lg', spacing: 'sm' });
      expect(result).toContain('h-12');
      expect(result).toContain('w-auto');
      expect(result).toContain('pr-2');
    });

    it('should work with all variant combinations', () => {
      const sizes = ['sm', 'default', 'lg', 'xl'] as const;
      const spacings = ['none', 'sm', 'default', 'lg'] as const;

      sizes.forEach((size) => {
        spacings.forEach((spacing) => {
          const result = logoVariants({ size, spacing });
          expect(result).toContain('rounded');
          expect(result).toContain('object-contain');
        });
      });
    });
  });
});
