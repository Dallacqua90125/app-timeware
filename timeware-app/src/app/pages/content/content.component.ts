import { ProductService } from '../../services/product/product.service';
import { Products } from './../../models/Products';
import { Component } from '@angular/core';

@Component({
  selector: 'app-content',
  standalone: false,
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {

  products: Products[] = [];
  filteredProductsList: Products[] = [];
  currentPage = 0;
  itemsPerPage = 15;

  minPrice: number | null = null;
  maxPrice: number | null = null;

  isFiltersVisible = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.GetProducts().subscribe(response => {
      this.products = response;
      this.filteredProductsList = [...this.products]; 
      console.log(response);
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProductsList.length / this.itemsPerPage);
  }

  paginatedProducts() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProductsList.slice(startIndex, endIndex);
  }

  applyFilters() {
    this.filteredProductsList = this.products.filter(product => {
      const price = parseFloat(product.price.replace('R$', '').trim().replace(',', '.'));

      const meetsMinPrice = this.minPrice !== null ? price >= this.minPrice : true;
      const meetsMaxPrice = this.maxPrice !== null ? price <= this.maxPrice : true;

      return meetsMinPrice && meetsMaxPrice;
    });
    this.currentPage = 0;
    this.toggleFilters();
  }

  clearFilters() {
    this.minPrice = null;
    this.maxPrice = null;
    this.filteredProductsList = [...this.products];
    this.currentPage = 0;
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  toggleFilters() {
    this.isFiltersVisible = !this.isFiltersVisible;
  }
}
