// Klaviyo Integration for E-commerce Tracking
// Documentation: https://developers.klaviyo.com/en/docs/guide_to_integrating_a_platform_without_a_pre_built_klaviyo_integration

declare global {
  interface Window {
    klaviyo?: {
      track: (event: string, properties: Record<string, unknown>) => void;
      trackViewedItem: (item: KlaviyoViewedItem) => void;
      identify: (properties: KlaviyoIdentifyProperties) => void;
      push: (args: unknown[]) => void;
    };
    _klOnsite?: unknown[];
  }
}

export interface KlaviyoIdentifyProperties {
  $email?: string;
  $phone_number?: string;
  $first_name?: string;
  $last_name?: string;
  $city?: string;
  $region?: string;
  $country?: string;
  $zip?: string;
  [key: string]: unknown;
}

export interface KlaviyoViewedItem {
  Title: string;
  ItemId: string;
  Categories?: string[];
  ImageUrl?: string;
  Url?: string;
  Metadata?: {
    Brand?: string;
    Price?: number;
    CompareAtPrice?: number;
    [key: string]: unknown;
  };
}

export interface KlaviyoProductProperties {
  ProductName: string;
  ProductID: string;
  SKU?: string;
  Categories?: string[];
  ImageURL?: string;
  URL?: string;
  Brand?: string;
  Price: number;
  CompareAtPrice?: number;
}

export interface KlaviyoCartItem {
  ProductID: string;
  ProductName: string;
  SKU?: string;
  Quantity: number;
  ItemPrice: number;
  RowTotal: number;
  ProductURL?: string;
  ImageURL?: string;
  ProductCategories?: string[];
}

export interface KlaviyoAddedToCartProperties {
  $value: number;
  AddedItemProductName: string;
  AddedItemProductID: string;
  AddedItemSKU?: string;
  AddedItemCategories?: string[];
  AddedItemImageURL?: string;
  AddedItemURL?: string;
  AddedItemPrice: number;
  AddedItemQuantity: number;
  CheckoutURL?: string;
  Items: KlaviyoCartItem[];
}

export interface KlaviyoStartedCheckoutProperties {
  $event_id: string;
  $value: number;
  ItemNames: string[];
  CheckoutURL: string;
  Categories?: string[];
  Items: KlaviyoCartItem[];
}

// Check if Klaviyo is loaded
function isKlaviyoReady(): boolean {
  return typeof window !== "undefined" && !!window.klaviyo;
}

// Wait for Klaviyo to be ready
function waitForKlaviyo(callback: () => void, maxAttempts = 10): void {
  let attempts = 0;
  const check = () => {
    if (isKlaviyoReady()) {
      callback();
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(check, 500);
    }
  };
  check();
}

// Identify a customer
export function identifyCustomer(properties: KlaviyoIdentifyProperties): void {
  waitForKlaviyo(() => {
    window.klaviyo?.identify(properties);
  });
}

// Track Viewed Product event
export function trackViewedProduct(product: KlaviyoProductProperties): void {
  waitForKlaviyo(() => {
    // Track the event
    window.klaviyo?.track("Viewed Product", product as unknown as Record<string, unknown>);

    // Also track for recently viewed items
    window.klaviyo?.trackViewedItem({
      Title: product.ProductName,
      ItemId: product.ProductID,
      Categories: product.Categories,
      ImageUrl: product.ImageURL,
      Url: product.URL,
      Metadata: {
        Brand: product.Brand,
        Price: product.Price,
        CompareAtPrice: product.CompareAtPrice,
      },
    });
  });
}

// Track Added to Cart event
export function trackAddedToCart(properties: KlaviyoAddedToCartProperties): void {
  waitForKlaviyo(() => {
    window.klaviyo?.track("Added to Cart", properties as unknown as Record<string, unknown>);
  });
}

// Track Started Checkout event
export function trackStartedCheckout(properties: KlaviyoStartedCheckoutProperties): void {
  waitForKlaviyo(() => {
    window.klaviyo?.track("Started Checkout", properties as unknown as Record<string, unknown>);
  });
}

// Generate unique event ID for checkout
export function generateEventId(cartId: string): string {
  return `${cartId}_${Math.floor(Date.now() / 1000)}`;
}

// Helper to format cart items for Klaviyo
export function formatCartItemsForKlaviyo(
  items: Array<{
    id: string;
    title: string;
    quantity: number;
    price: number;
    productTitle: string;
    productHandle: string;
    imageUrl?: string;
  }>,
  baseUrl: string = ""
): KlaviyoCartItem[] {
  return items.map((item) => ({
    ProductID: item.id,
    ProductName: `${item.productTitle} - ${item.title}`,
    Quantity: item.quantity,
    ItemPrice: item.price,
    RowTotal: item.price * item.quantity,
    ProductURL: `${baseUrl}/products/${item.productHandle}`,
    ImageURL: item.imageUrl,
    ProductCategories: ["Functional Beverage"],
  }));
}

// Calculate cart total
export function calculateCartTotal(items: KlaviyoCartItem[]): number {
  return items.reduce((sum, item) => sum + item.RowTotal, 0);
}

// Server-side: Track order events via API
export interface KlaviyoOrderItem {
  ProductID: string;
  SKU?: string;
  ProductName: string;
  Quantity: number;
  ItemPrice: number;
  RowTotal: number;
  ProductURL?: string;
  ImageURL?: string;
  Categories?: string[];
  Brand?: string;
}

export interface KlaviyoBillingAddress {
  FirstName?: string;
  LastName?: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  RegionCode?: string;
  CountryCode?: string;
  Zip?: string;
  Phone?: string;
}

export interface KlaviyoPlacedOrderPayload {
  email: string;
  phone?: string;
  orderId: string;
  orderTotal: number;
  currency?: string;
  itemNames: string[];
  categories?: string[];
  discountCode?: string;
  discountValue?: number;
  items: KlaviyoOrderItem[];
  billingAddress?: KlaviyoBillingAddress;
  orderDate?: string;
}

// Track placed order via server API
export async function trackPlacedOrder(payload: KlaviyoPlacedOrderPayload): Promise<{ success: boolean; orderId: string }> {
  const response = await fetch("/api/klaviyo/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to track order");
  }

  return response.json();
}
