import type { Product, DiscountCode, Testimonial } from './types';

// ===================================================================================
//  مرحباً! هذا هو المكان الذي يمكنك فيه تحديث منتجاتك وعروضك.
//  Hello! This is where you can update your products and offers.
// ===================================================================================

/**
 * -----------------------------------------------------------------------------------
 *  قائمة المنتجات - Product List
 * -----------------------------------------------------------------------------------
 *  لإضافة منتج جديد، انسخ أحد العناصر الموجودة وألصقه، ثم قم بتغيير التفاصيل.
 *  To add a new product, copy and paste one of the existing items and change the details.
 * 
 *  ->  ملاحظة: تم إفراغ حقول الصور. أدخل الروابط الخاصة بصورك في حقل "imageUrl".
 *      (Note: The image fields have been cleared. Enter your image URLs in the "imageUrl" field.)
 * 
 *      مثال: "https://your-image-host.com/my-product.jpg"
 *      Example: "https://your-image-host.com/my-product.jpg"
 */
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: { ar: " كشميري فاخر", en: "Luxury Kashmiri Blend" },
    category: { ar: "مصار", en: "Shawls" },
    price: 60,
    salePrice: 45,
    imageUrl: "https://i.postimg.cc/c1bHzQdx/IMG-0122.jpg",
    description: {
      ar: "جودة استثنائية تمنحك إطلالة راقية مع خام السوبر ترمة المستورد من كشمير. فخامة استثنائية لا مثيل لها.",
      en: "Exceptional quality gives you a sophisticated look with raw Super Terma imported from Kashmir. Unparalleled luxury."
    },
    stock: 5,
    tags: {
      ar: ["كشمير", "فاخر", "مصار", "شتاء"],
      en: ["Kashmir", "Luxury", "Shawl", "Winter"]
    },
    sku: "BHI-001",
  },
  {
    id: 2,
    name: { ar: "مصر عادي ", en: "Genuine Wool Mussar" },
    category: { ar: "مصار", en: "Shawls" },
    price: 30,
    salePrice: 22,
    imageUrl: "https://i.postimg.cc/c1bHzQdx/IMG-0122.jpg",
     description: {
      ar: "صوف أصلي 100% ، هيبة وراحة لا مثيل لهما. تصميم كلاسيكي يناسب جميع المناسبات.",
      en: "100% genuine wool that provides unmatched warmth and comfort. A classic design suitable for all occasions."
    },
    stock: 10,
    tags: {
      ar: ["صوف", "أصلي", "كلاسيكي"],
      en: ["Wool", "Genuine", "Classic"]
    },
    sku: "BHI-002",
  },
  {
    id: 3,
    name: { ar: "مصر كنود  ", en: "Egyptian Cotton Scarf" },
    category: { ar: "إكسسوارات", en: "Accessories" },
    price: 25,
    imageUrl: "https://i.postimg.cc/c1bHzQdx/IMG-0122.jpg",
    description: {
      ar: "قطن كندي فائق النعومة، مثالي للاستخدام اليومي. خفيف الوزن ويضيف لمسة من الأناقة لإطلالتك.",
      en: "Ultra-soft Egyptian cotton, perfect for daily use. Lightweight and adds a touch of elegance to your look."
    },
    stock: 15,
    tags: {
      ar: ["قطن", "يومي", "إكسسوارات"],
      en: ["Cotton", "Daily", "Accessories"]
    },
    sku: "BHI-003",
  },
  {
    id: 4,
    name: { ar: "مصر ترمة VIP", en: "VIP Terma Mussar" },
    category: { ar: "مصار", en: "Shawls" },
    price: 50,
    salePrice: 38,
    imageUrl: "https://i.postimg.cc/c1bHzQdx/IMG-0122.jpg",
    description: {
      ar: "أرقى أنواع الترمة، مصمم خصيصًا للشخصيات المهمة. يجمع بين الفخامة والتقليد.",
      en: "The finest type of Terma, specially designed for VIPs. It combines luxury and tradition."
    },
    stock: 8,
    tags: {
      ar: ["ترمة", "VIP", "فخامة"],
      en: ["Terma", "VIP", "Luxury"]
    },
    sku: "BHI-004",
  }
];

/**
 * -----------------------------------------------------------------------------------
 *  أكواد الخصم - Discount Codes
 * -----------------------------------------------------------------------------------
 */
export const DISCOUNT_CODES: DiscountCode[] = [
  { code: 'bahi10', percentage: 10 },
  { code: 'welcome', percentage: 5 },
  { code: 'ramadan', percentage: 30 },
];

/**
 * -----------------------------------------------------------------------------------
 *  قائمة الشهادات - Testimonials List
 * -----------------------------------------------------------------------------------
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    text: {
      ar: "جودة القماش ممتازة والتصميم فريد. وصلتني الطلبية بسرعة. شكرًا لكم!",
      en: "The fabric quality is excellent and the design is unique. The order arrived quickly. Thank you!"
    },
    author: { ar: "زبون باهي", en: "Bahi Customer" },
    rating: 5,
  },
  {
    id: 2,
    text: {
      ar: "المصر فخم جدًا ويستاهل كل ريال. التعامل راقي والخدمة سريعة.",
      en: "The shawl is very luxurious and worth every penny. The service is classy and fast."
    },
    author: { ar: "زبون باهي", en: "Bahi Customer" },
    rating: 5,
  },
  {
    id: 3,
    text: {
      ar: "تشكيلة رائعة والمصر جميل، لكن كنت أتمنى لو كان هناك المزيد من خيارات الألوان. بشكل عام تجربة جيدة.",
      en: "Great collection and the shawl is beautiful, but I wished there were more color options. Overall a good experience."
    },
    author: { ar: "زبون باهي", en: "Bahi Customer" },
    rating: 4,
  },
  {
    id: 4,
    text: {
      ar: "تفاصيل المصر دقيقة وجميلة، يضيف لمسة أناقة لأي مناسبة. سعيد جدًا بشرائي.",
      en: "The details on the shawl are precise and beautiful, adding a touch of elegance to any occasion. Very happy with my purchase."
    },
    author: { ar: "زبون باهي", en: "Bahi Customer" },
    rating: 5,
  },
  {
    id: 5,
    text: {
      ar: "الخامة ناعمة ومريحة جدًا على اللبس. اللون نفس الصورة تمامًا. منتج رائع!",
      en: "The material is very soft and comfortable to wear. The color is exactly like the picture. Great product!"
    },
    author: { ar: "زبون باهي", en: "Bahi Customer" },
    rating: 5,
  },
  {
    id: 6,
    text: {
      ar: "خدمة العملاء كانت متعاونة جدًا وأجابت على كل استفساراتي بصدر رحب. تجربة تسوق مميزة.",
      en: "Customer service was very helpful and answered all my inquiries patiently. A unique shopping experience."
    },
    author: { ar: "زبون باهي", en: "Bahi Customer" },
    rating: 5,
  },
  {
    id: 7,
    text: {
      ar: "التغليف كان أنيقًا جدًا ومناسب ليكون هدية. وصل المنتج في حالة ممتازة.",
      en: "The packaging was very elegant and suitable for a gift. The product arrived in perfect condition."
    },
    author: { ar: "زبون باهي", en: "Bahi Customer" },
    rating: 4,
  },
  {
    id: 8,
    text: {
      ar: "موقع سهل الاستخدام وعملية الطلب كانت سلسة وبسيطة. بالتأكيد سأوصي به لأصدقائي.",
      en: "The website is user-friendly and the ordering process was smooth and simple. I will definitely recommend it to my friends."
    },
    author: { ar: "زبون باهي", en: "Bahi Customer" },
    rating: 5,
  },
  {
    id: 9,
    text: {
      ar: "أعجبتني التشكيلة المتجددة، دائمًا أجد شيئًا جديدًا ومميزًا في كل زيارة للمتجر.",
      en: "I love the constantly updated collection, I always find something new and special every time I visit the store."
    },
    author: { ar: "زبون باهي", en: "Bahi Customer" },
    rating: 5,
  },
  {
    id: 10,
    text: {
      ar: "الجودة ممتازة بالنسبة للسعر. التوصيل أخذ وقتاً أطول قليلاً من المتوقع ولكنه وصل بأمان. راضٍ عن الشراء.",
      en: "The quality is excellent for the price. Delivery took a bit longer than expected but it arrived safely. Satisfied with the purchase."
    },
    author: { ar: "زبون باهي", en: "Bahi Customer" },
    rating: 4,
  },
  {
    id: 11,
    text: {
      ar: "التوصيل كان أسرع من المتوقع. المندوب كان محترفًا ومهذبًا.",
      en: "Delivery was faster than expected. The courier was professional and polite."
    },
    author: { ar: "زبون باهي", en: "Bahi Customer" },
    rating: 4,
  },
  {
    id: 12,
    text: {
      ar: "منتج أصلي وفاخر. أشعر بالتميز عند ارتدائه. شكرًا 'باهي' على هذه القطعة الفنية.",
      en: "An authentic and luxurious product. I feel distinguished when I wear it. Thank you 'Bahi' for this piece of art."
    },
    author: { ar: "زبون باهي", en: "Bahi Customer" },
    rating: 5,
  },
];