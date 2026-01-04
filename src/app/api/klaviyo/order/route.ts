import { NextRequest, NextResponse } from "next/server";

// Klaviyo API configuration
const KLAVIYO_PRIVATE_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
const KLAVIYO_API_URL = "https://a.klaviyo.com/api/events/";
const KLAVIYO_API_REVISION = "2024-02-15";

interface OrderItem {
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

interface BillingAddress {
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

interface PlacedOrderPayload {
  email: string;
  phone?: string;
  orderId: string;
  orderTotal: number;
  currency?: string;
  itemNames: string[];
  categories?: string[];
  discountCode?: string;
  discountValue?: number;
  items: OrderItem[];
  billingAddress?: BillingAddress;
  orderDate?: string;
}

async function trackKlaviyoEvent(
  metricName: string,
  properties: Record<string, unknown>,
  profile: { email?: string; phone_number?: string },
  value: number,
  currency: string = "USD",
  uniqueId: string,
  time?: string
) {
  if (!KLAVIYO_PRIVATE_API_KEY) {
    throw new Error("KLAVIYO_PRIVATE_API_KEY is not configured");
  }

  const payload = {
    data: {
      type: "event",
      attributes: {
        properties,
        time: time || new Date().toISOString(),
        value,
        value_currency: currency,
        unique_id: uniqueId,
        metric: {
          data: {
            type: "metric",
            attributes: {
              name: metricName,
            },
          },
        },
        profile: {
          data: {
            type: "profile",
            attributes: profile,
          },
        },
      },
    },
  };

  const response = await fetch(KLAVIYO_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${KLAVIYO_PRIVATE_API_KEY}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      revision: KLAVIYO_API_REVISION,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Klaviyo API error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    const body: PlacedOrderPayload = await request.json();

    const {
      email,
      phone,
      orderId,
      orderTotal,
      currency = "USD",
      itemNames,
      categories = [],
      discountCode,
      discountValue,
      items,
      billingAddress,
      orderDate,
    } = body;

    if (!email || !orderId || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: email, orderId, and items are required" },
        { status: 400 }
      );
    }

    const profile: { email?: string; phone_number?: string } = { email };
    if (phone) {
      profile.phone_number = phone;
    }

    // Track Placed Order event
    const placedOrderProperties: Record<string, unknown> = {
      OrderId: orderId,
      Categories: categories,
      ItemNames: itemNames,
      Items: items,
    };

    if (discountCode) {
      placedOrderProperties.DiscountCode = discountCode;
      placedOrderProperties.DiscountValue = discountValue || 0;
    }

    if (billingAddress) {
      placedOrderProperties.BillingAddress = billingAddress;
    }

    await trackKlaviyoEvent(
      "Placed Order",
      placedOrderProperties,
      profile,
      orderTotal,
      currency,
      `order_${orderId}`,
      orderDate
    );

    // Track individual Ordered Product events for each item
    for (const item of items) {
      const orderedProductProperties = {
        OrderId: orderId,
        ProductID: item.ProductID,
        SKU: item.SKU,
        ProductName: item.ProductName,
        Quantity: item.Quantity,
        Categories: item.Categories || [],
        ProductBrand: item.Brand || "DATE",
        ProductURL: item.ProductURL,
        ImageURL: item.ImageURL,
      };

      await trackKlaviyoEvent(
        "Ordered Product",
        orderedProductProperties,
        profile,
        item.RowTotal,
        currency,
        `order_${orderId}_product_${item.ProductID}`,
        orderDate
      );
    }

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("Error tracking Klaviyo order event:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to track order" },
      { status: 500 }
    );
  }
}
