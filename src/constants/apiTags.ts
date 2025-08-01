// Grouped tagTypes by module
const userTags = [
  "UserProfile",
  "UserList",
  "SellerRequest",
  "ApprovedVendors",
  "BlockedVendors",
] as const;
const bookTags = ["Book", "BookList"] as const;
const authTags = ["Auth"] as const;
const dashboardTags = ["Dashboard"] as const;
const orderTags = ["Orders"] as const;
const reviewTags = ["Review"] as const;
const categoryTags = ['Categories', 'Category'] as const;
const productTags = ['Products', 'Product','PurchasedProducts','FeaturedProducts'] as const;
 

// Export a flat list
export const apiTagTypes = [
  ...userTags,
  ...bookTags,
  ...authTags,
  ...dashboardTags,
  ...orderTags,
  ...reviewTags,
  ...categoryTags,
  ...productTags,
] as const;
