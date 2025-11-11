// This file contains assets and translations for the application.

// 1. ASSETS
// ==========================================

// ===================================================================================
//  شعار المتجر - Store Logo
// ===================================================================================
//  لقد قمت بتحديث المسار ليستخدم المجلد القياسي "images" (بصيغة الجمع).
//  الآن سيتم تحميل الشعار من المسار "/images/bahilogo.jpg".
//  تأكد من أن اسم المجلد لديك هو "images" وأن الصورة "bahilogo.jpg" بداخله.
//
//  I have updated the path to use the standard "images" folder (plural).
//  The logo will now be loaded from "/images/bahilogo.jpg".
//  Please ensure your folder is named "images" and the "bahilogo.jpg" file is inside it.
// ===================================================================================
// URL for the logo image
export const BAHI_LOGO_URL = `/images/bahilogo.jpg`;

// SVG icons
export const OMAN_FLAG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#FFF" d="M0 0h36v36H0z"/><path fill="#D21034" d="M12 0h24v36H12z"/><path fill="#007A3D" d="M12 18h24v18H12z"/><path fill="#D21034" d="M0 0h12v36H0z"/><path fill="#FFF" d="M5.14 5.14a4.86 4.86 0 0 0 0 6.88 4.86 4.86 0 0 0 6.88 0l-1.02-1.02a3.44 3.44 0 0 1-4.85 0 3.44 3.44 0 0 1 0-4.85 3.44 3.44 0 0 1 4.85 0l1.02-1.02a4.86 4.86 0 0 0-6.88 0z"/><path fill="#FFF" d="M6 3.1h5.1v2H7.72L10.3 7.7a.7.7 0 0 1 0 1 .7.7 0 0 1-1 0L7.04 6.43V9.1H5.1V3.1H6zm.5 10.95c.3-.1.6-.2.9-.2s.6.1.9.2l.4.4-1.3 1.3-1.3-1.3.4-.4z"/><path fill="#D21034" d="M7.78 11.45a3.44 3.44 0 0 0 4.85 0l-1.12-1.12a2 2 0 0 1-2.6 0l-1.13 1.12z"/><path fill="#FFF" d="M9.82 8.7a.7.7 0 0 1-1 0L6.5 6.4v3.1h-2v-7h7v2H8.38l2.32 2.3a.7.7 0 0 1 0 1zM6 10.08h5.1v1.88H6zm3.9-3.78a2.43 2.43 0 1 0-3.44 0 2.43 2.43 0 0 0 3.44 0z"/></svg>`;

export const USA_FLAG_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#B22234" d="M32 5H0v2H0v2H0v2H0v2h32V5zm0 6H0v2H0v2h32v-4zM0 21h32v-2H0v-2H0v4zm0 6h32v-2H0v-2H0v4z"/><path fill="#3C3B6E" d="M0 5h18v14H0z"/><path fill="#FFF" d="m4 6 1 3h3l-2 2 1 3-3-2-3 2 1-3-2-2h3z m10 0 1 3h3l-2 2 1 3-3-2-3 2 1-3-2-2h3z m-5 3.5 1 3h3l-2 2 1 3-3-2-3 2 1-3-2-2h3z m10 0 1 3h3l-2 2 1 3-3-2-3 2 1-3-2-2h3z m-5 3.5 1 3h3l-2 2 1 3-3-2-3 2 1-3-2-2h3z"/></svg>`;

export const INSTAGRAM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
</svg>`;

export const WHATSAPP_SVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.908 6.161l-1.317 4.814 4.893-1.282zM9.062 8.611c-.021-.123-.16-.2-.355-.2-.178 0-.374-.01-.546-.01-.221 0-.441.031-.64.153-.258.157-.492.355-.67.604-.213.292-.354.626-.354 1.014 0 .428.149.82.368 1.15.228.347.505.67.81 1.005.348.379.728.742 1.13 1.09.522.455 1.01.812 1.516 1.066.592.302 1.18.428 1.76.428.324 0 .61-.051.84-.123.308-.092.64-.289.87-.589.255-.325.395-.733.395-1.178 0-.254-.04-.498-.12-.732-.08-.234-.23-.429-.44-.574-.21-.145-.44-.22-.7-.22-.26 0-.5.061-.71.183s-.38.28-.51.465c-.13.184-.24.325-.33.428-.109.122-.21.183-.31.183-.1 0-.18-.03-.26-.1-.1-.06-.25-.151-.45-.272-.34-.213-.64-.498-.89-.832-.23-.326-.39-.641-.46-.948-.07-.307-.03-.565.04-.773.07-.208.19-.375.36-.498.17-.123.33-.183.49-.183.16 0 .31.041.45.123s.25.184.34.305c.09.123.16.2.22.2.06 0 .12-.01.18-.04s.17-.071.25-.122c.08-.051.15-.112.21-.183.06-.071.1-.152.12-.243.02-.092.02-.173.01-.244-.01-.071-.02-.132-.04-.183-.02-.051-.05-.102-.09-.153z"></path>
</svg>`;


// 2. TRANSLATIONS
// ==========================================

export const translations = {
  ar: {
    brandName: 'باهي',
    // Header & Menu
    menuHome: 'الرئيسية',
    menuAbout: 'عنا',
    menuContact: 'تواصل معنا',
    menuLanguage: 'اللغة',

    // Hero Section
    heroTitle: 'تخفيضات نهاية الموسم',
    heroSubtitle: 'اكتشفي أحدث صيحات الموضة بأسعار لا تقاوم. خصومات تصل إلى 50% على تشكيلة مختارة.',
    heroButton: 'تسوقي الآن',

    // Product List
    newArrivals: 'وصل حديثاً',

    // Product Card
    sale: 'تخفيض',
    addToCart: 'أضف إلى السلة',
    currency: 'ر.ع.',

    // Cart
    cartTitle: 'سلة التسوق',
    cartDiscountPlaceholder: 'أدخل كود الخصم',
    cartApply: 'تطبيق',
    cartInvalidCode: 'كود الخصم غير صالح.',
    cartCodeSuccess: 'تم تطبيق كود الخصم بنجاح!',
    cartSubtotal: 'المجموع الفرعي',
    cartDiscount: 'الخصم',
    cartTotal: 'المجموع الإجمالي',
    cartCheckout: 'إتمام الشراء',
    cartEmptyTitle: 'سلتك فارغة',
    cartEmptySubtitle: 'ابدأ بإضافة بعض المنتجات الرائعة!',

    // Footer
    footerSubtitle: 'وجهتك الأولى للأناقة.',
    contact: 'التواصل',
    footerRights: 'جميع الحقوق محفوظة.',
    
    // About Page
    aboutTitle: 'عنا',
    aboutText: 'هذه هي صفحة عنا. سيتم تحديث المحتوى قريباً.',

    // Contact Page
    contactTitle: 'تواصل معنا',
    contactSubtitle: 'كيف يمكننا المساعدة؟',
    contactName: 'اسمك الكريم',
    contactPhone: 'رقمك للتواصل',
    contactEmail: 'ايميلك للتواصل',
    contactMessage: 'رسالتك',
    contactSend: 'إرسال الرسالة',
  },
  en: {
    brandName: 'Bahi',
    // Header & Menu
    menuHome: 'Home',
    menuAbout: 'About Us',
    menuContact: 'Contact Us',
    menuLanguage: 'Language',

    // Hero Section
    heroTitle: 'End of Season Sale',
    heroSubtitle: 'Discover the latest fashion trends at irresistible prices. Discounts up to 50% on selected items.',
    heroButton: 'Shop Now',

    // Product List
    newArrivals: 'New Arrivals',

    // Product Card
    sale: 'SALE',
    addToCart: 'Add to Cart',
    currency: 'OMR',

    // Cart
    cartTitle: 'Shopping Cart',
    cartDiscountPlaceholder: 'Enter discount code',
    cartApply: 'Apply',
    cartInvalidCode: 'Invalid discount code.',
    cartCodeSuccess: 'Discount code applied successfully!',
    cartSubtotal: 'Subtotal',
    cartDiscount: 'Discount',
    cartTotal: 'Total',
    cartCheckout: 'Proceed to Checkout',
    cartEmptyTitle: 'Your cart is empty',
    cartEmptySubtitle: 'Start adding some amazing products!',

    // Footer
    footerSubtitle: 'Your first destination for elegance.',
    contact: 'Contact',
    footerRights: 'All rights reserved.',

    // About Page
    aboutTitle: 'About Us',
    aboutText: 'This is the About Us page. Content will be updated soon.',

    // Contact Page
    contactTitle: 'Contact Us',
    contactSubtitle: 'How can we help?',
    contactName: 'Your Name',
    contactPhone: 'Your Phone Number',
    contactEmail: 'Your Email',
    contactMessage: 'Your Message',
    contactSend: 'Send Message',
  },
};