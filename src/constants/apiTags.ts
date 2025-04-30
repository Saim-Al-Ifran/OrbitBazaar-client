// Grouped tagTypes by module
const userTags = [
  "UserProfile",
  "UserList",
  "SellerRequest",
  "ApprovedVendors",
  "BlockedUsers",
] as const;
const bookTags = ["Book", "BookList"] as const;
const authTags = ["Auth"] as const;
const dashboardTags = ["Dashboard"] as const;
const orderTags = ["Order"] as const;
const reviewTags = ["Review"] as const;
const categoryTags = ["Category"] as const;
 

// Export a flat list
export const apiTagTypes = [
  ...userTags,
  ...bookTags,
  ...authTags,
  ...dashboardTags,
  ...orderTags,
  ...reviewTags,
  ...categoryTags,
] as const;
