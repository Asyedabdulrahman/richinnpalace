export interface WhatsAppReservationData {
  guestName: string;
  guestPhone?: string;
  guestEmail?: string;
  roomName: string;
  roomTag?: string;
  propertyName?: string;
  checkIn: string;
  checkOut: string;
  duration: string;
  guests: string | number;
  specialRequests?: string;
  estimatedTotal: string;
}

/**
 * Retrieves the hotel WhatsApp number from environment variables or falls back to a clean default.
 */
export function getHotelWhatsAppNumber(): string {
  const envNumber = process.env.NEXT_PUBLIC_HOTEL_WHATSAPP_NUMBER || "";
  // Strip any spaces, dashes, plus signs for clean wa.me format
  const cleaned = envNumber.replace(/[^0-9]/g, "");
  return cleaned || "911415550198";
}

/**
 * Builds the structured WhatsApp reservation enquiry message.
 */
export function buildWhatsAppReservationMessage(data: WhatsAppReservationData): string {
  const lines: string[] = [
    "Hello Rich Inn Palace,",
    "",
    "I would like to enquire about a reservation request.",
    "",
    `Name: ${data.guestName}`,
    `Room: ${data.roomName}${data.roomTag ? ` (${data.roomTag})` : ""}`,
  ];

  if (data.propertyName) {
    lines.push(`Property: ${data.propertyName}`);
  }

  lines.push(
    `Check-in: ${data.checkIn}`,
    `Check-out: ${data.checkOut} (${data.duration})`,
    `Guests: ${data.guests} Adults`
  );

  if (data.specialRequests && data.specialRequests.trim()) {
    lines.push(`Special Requests: ${data.specialRequests.trim()}`);
  }

  lines.push(
    `Estimated Total: ${data.estimatedTotal}`,
    "",
    "I have submitted a reservation request through your website."
  );

  return lines.join("\n");
}

/**
 * Constructs the full WhatsApp click-to-chat URL.
 */
export function buildWhatsAppUrl(data: WhatsAppReservationData): string {
  const phone = getHotelWhatsAppNumber();
  const message = buildWhatsAppReservationMessage(data);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedText}`;
}
