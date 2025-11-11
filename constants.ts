import type { Product, DiscountCode } from './types';

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
 *  ->  كيفية إضافة صورك الخاصة (How to add your own images):
 *      1. أنشئ مجلداً جديداً في مشروعك وسمّه "images".
 *         (Create a new folder in your project and name it "images").
 *      2. ضع صور منتجاتك داخل هذا المجلد.
 *         (Place your product images inside this folder).
 *      3. في الحقل "imageUrl"، استبدل "phototest.jpg" بالاسم الدقيق لملف صورتك.
 *         (In the "imageUrl" field, replace "phototest.jpg" with the exact name of your image file).
 * 
 *      مثال: إذا كان اسم صورتك هو "my-dress.png"، يجب أن يكون المسار: "/images/my-dress.png"
 *      Example: If your image is named "my-dress.png", the path should be: "/images/my-dress.png"
 */
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: { ar: "مزيج من الباشمينا وخامة سوبر تورمة VIP", en: "Bashmena & Suber VIP Torma" },
    category: { ar: "فساتين", en: "Dresses" },
    price: 350,
    salePrice: 280,
    imageUrl: "/images/phototest.jpg", // <-- استبدل "phototest.jpg" باسم ملف صورتك. Replace "phototest.jpg" with your image file name.
  },
  {
    id: 2,
    name: { ar: "بلوزة بيضاء كلاسيكية", en: "Classic White Blouse" },
    category: { ar: "بلوزات", en: "Blouses" },
    price: 180,
    imageUrl: "/images/phototest.jpg", // <-- استبدل "phototest.jpg" باسم ملف صورتك. Replace "phototest.jpg" with your image file name.
  },
  {
    id: 3,
    name: { ar: "حقيبة يد جلدية", en: "Leather Handbag" },
    category: { ar: "إكسسوارات", en: "Accessories" },
    price: 450,
    salePrice: 399,
    imageUrl: "/images/phototest.jpg", // <-- استبدل "phototest.jpg" باسم ملف صورتك. Replace "phototest.jpg" with your image file name.
  },
  {
    id: 4,
    name: { ar: "بنطلون جينز عصري", en: "Modern Jeans" },
    category: { ar: "بناطيل", en: "Pants" },
    price: 250,
    imageUrl: "/images/phototest.jpg", // <-- استبدل "phototest.jpg" باسم ملف صورتك. Replace "phototest.jpg" with your image file name.
  },
  {
    id: 5,
    name: { ar: "حذاء كعب عالي", en: "High-Heeled Shoes" },
    category: { ar: "أحذية", en: "Shoes" },
    price: 320,
    imageUrl: "/images/phototest.jpg", // <-- استبدل "phototest.jpg" باسم ملف صورتك. Replace "phototest.jpg" with your image file name.
  },
  {
    id: 6,
    name: { ar: "نظارة شمسية أنيقة", en: "Elegant Sunglasses" },
    category: { ar: "إكسسوارات", en: "Accessories" },
    price: 150,
    salePrice: 120,
    imageUrl: "/images/phototest.jpg", // <-- استبدل "phototest.jpg" باسم ملف صورتك. Replace "phototest.jpg" with your image file name.
  },
  {
    id: 7,
    name: { ar: "تنورة قصيرة", en: "Short Skirt" },
    category: { ar: "تنانير", en: "Skirts" },
    price: 220,
    imageUrl: "/images/phototest.jpg", // <-- استبدل "phototest.jpg" باسم ملف صورتك. Replace "phototest.jpg" with your image file name.
  },
  {
    id: 8,
    name: { ar: "جاكيت رسمي", en: "Formal Jacket" },
    category: { ar: "جاكيتات", en: "Jackets" },
    price: 550,
    salePrice: 475,
    imageUrl: "/images/phototest.jpg", // <-- استبدل "phototest.jpg" باسم ملف صورتك. Replace "phototest.jpg" with your image file name.
  },
];

/**
 * -----------------------------------------------------------------------------------
 *  أكواد الخصم - Discount Codes
 * -----------------------------------------------------------------------------------
 *  هنا يمكنك تحديد أكواد الخصم ونسب الخصم. يمكنك إضافة المزيد من الأكواد في هذه القائمة.
 *  Here you can define discount codes and their percentages. You can add more codes to this list.
 */
export const DISCOUNT_CODES: DiscountCode[] = [
  {
    code: "BAHI25",
    percentage: 25,
  },
  {
    code: "BAHI10",
    percentage: 10,
  },
];
