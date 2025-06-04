// تحسينات الأداء وتهيئة SEO للمتجر الإلكتروني - ملف JavaScript

// تحميل الصور بشكل كسول (Lazy Loading)
document.addEventListener('DOMContentLoaded', function() {
  // تحديد جميع الصور التي تحتاج إلى تحميل كسول
  const lazyImages = document.querySelectorAll('.lazy-image');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  } else {
    // Fallback للمتصفحات القديمة التي لا تدعم IntersectionObserver
    lazyImages.forEach(function(img) {
      img.src = img.dataset.src;
      img.classList.add('loaded');
    });
  }
});

// تكبير صور المنتجات
document.addEventListener('DOMContentLoaded', function() {
  const productImages = document.querySelectorAll('.product-image-zoom');
  
  productImages.forEach(function(img) {
    img.addEventListener('click', function() {
      this.classList.toggle('zoomed');
    });
  });
});

// حفظ محتويات السلة للمستخدمين غير المسجلين
const cartStorage = {
  saveCart: function(cartItems) {
    localStorage.setItem('digitalStoreCart', JSON.stringify(cartItems));
  },
  
  getCart: function() {
    const cart = localStorage.getItem('digitalStoreCart');
    return cart ? JSON.parse(cart) : [];
  },
  
  clearCart: function() {
    localStorage.removeItem('digitalStoreCart');
  },
  
  addItem: function(item) {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }
    
    this.saveCart(cart);
  },
  
  removeItem: function(itemId) {
    const cart = this.getCart();
    const updatedCart = cart.filter(item => item.id !== itemId);
    this.saveCart(updatedCart);
  },
  
  updateQuantity: function(itemId, quantity) {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex > -1) {
      cart[itemIndex].quantity = quantity;
      this.saveCart(cart);
    }
  }
};

// تحسين أداء البحث
const searchOptimizer = {
  debounce: function(func, wait) {
    let timeout;
    return function(...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  },
  
  initSearch: function(searchInputId, resultsContainerId) {
    const searchInput = document.getElementById(searchInputId);
    const resultsContainer = document.getElementById(resultsContainerId);
    
    if (!searchInput || !resultsContainer) return;
    
    const debouncedSearch = this.debounce(function(query) {
      // هنا سيتم استدعاء API البحث أو البحث المحلي
      // في التطبيق الحقيقي، سيتم ربط هذا مع Firebase
      console.log('Searching for:', query);
      
      // محاكاة نتائج البحث
      if (query.length > 2) {
        resultsContainer.innerHTML = `<p>جاري البحث عن: ${query}...</p>`;
        // هنا سيتم عرض نتائج البحث الفعلية
      } else {
        resultsContainer.innerHTML = '';
      }
    }, 300);
    
    searchInput.addEventListener('input', function() {
      const query = this.value.trim();
      debouncedSearch(query);
    });
  }
};

// تحسين تجربة النماذج
const formEnhancer = {
  validateForm: function(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required]');
      
      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          isValid = false;
          this.showError(field, 'هذا الحقل مطلوب');
        } else {
          this.clearError(field);
        }
      }, this);
      
      if (!isValid) {
        e.preventDefault();
      }
    }.bind(this));
  },
  
  showError: function(field, message) {
    let errorElement = field.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message text-error text-sm mt-1';
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    errorElement.textContent = message;
    field.classList.add('border-error');
  },
  
  clearError: function(field) {
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      errorElement.textContent = '';
    }
    field.classList.remove('border-error');
  }
};

// تحسين تجربة المستخدم على الأجهزة المحمولة
const mobileEnhancer = {
  init: function() {
    this.setupMobileMenu();
    this.fixTablesOnMobile();
  },
  
  setupMobileMenu: function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!menuToggle || !mobileMenu) return;
    
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('menu-open');
    });
  },
  
  fixTablesOnMobile: function() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(function(table) {
      const wrapper = document.createElement('div');
      wrapper.className = 'responsive-table';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }
};

// تهيئة الموقع لمحركات البحث (SEO)
const seoEnhancer = {
  addStructuredData: function() {
    // إضافة البيانات المنظمة للمنتجات
    const products = document.querySelectorAll('.product-item');
    
    products.forEach(function(product) {
      const name = product.querySelector('.product-name')?.textContent;
      const price = product.querySelector('.product-price')?.dataset.price;
      const image = product.querySelector('.product-image')?.src;
      const description = product.querySelector('.product-description')?.textContent;
      
      if (name && price) {
        const structuredData = {
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: name,
          image: image || '',
          description: description || '',
          offers: {
            '@type': 'Offer',
            priceCurrency: 'SAR',
            price: price,
            availability: 'https://schema.org/InStock'
          }
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    });
  }
};

// تنفيذ التحسينات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  mobileEnhancer.init();
  searchOptimizer.initSearch('search-input', 'search-results');
  formEnhancer.validateForm('checkout-form');
  formEnhancer.validateForm('contact-form');
  formEnhancer.validateForm('login-form');
  formEnhancer.validateForm('register-form');
  seoEnhancer.addStructuredData();
});
