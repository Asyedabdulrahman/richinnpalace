# 05 — Analytics Implementation Details

**Audit Date**: August 10, 2026  
**Implementation Files**:
- `src/lib/analytics.ts`
- `src/app/layout.tsx`
- `src/components/booking/BookingClient.tsx`
- `src/components/booking/ReservationConfirmationView.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/home/HeroSection.tsx`
- `src/components/home/FeaturedRooms.tsx`
- `src/components/rooms/RoomsClient.tsx`
- `src/app/rooms/[slug]/StickyBookingPanel.tsx`

---

## 1. Script Tag Integration (`src/app/layout.tsx`)

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
      anonymize_ip: true
    });
  `}
</Script>
```

---

## 2. Event Instrumentation Map

1. **Booking Funnel**:
   - Page load: `trackBookingStarted("booking_page", initialRoomId, initialBranchId)`
   - Chamber switch: `trackRoomSelected(roomId, newRoom?.name, newBranchId)`
   - Date pick: `trackDateSelected(nights)`
   - Contact form focus: `trackGuestDetailsStarted(selectedRoomId, nights, guests)`
   - Request submitted: `trackReservationSubmitted(...)`
   - Request failed: `trackReservationFailed(selectedRoomId, errorType)`
2. **Concierge & Social Handover**:
   - WhatsApp confirmation click: `trackWhatsAppClick("booking_confirmation", selectedRoom?.id)`
   - Phone dial click: `trackPhoneClick("footer")`
   - Mail enquiry click: `trackEmailClick("footer")`
3. **Hero & Room Navigation**:
   - Hero CTA: `trackBookNowClick("hero")`
   - Navbar CTA: `trackBookNowClick("navbar")`
   - Room card click: `trackRoomView(room.id, room.tag, room.price)`
