import { View } from "react-native";
import { Chip } from "react-native-paper";
import NothingFound from "./NothingFound";
import BookingHistoryCard from "./BookingHistoryCard";
import { createCancellationAlert } from "../utils/booking-utils";

/**
 * A JSX component representing both upcoming and past bookings.
 */
export default function BookingsContainer({
  bookings,
  pastBookings,
  handleCancellation,
}) {
  return (
    <>
      <Chip icon="information">All bookings include a 10-minute extension</Chip>
      {bookings.length ? (
        bookings.map((booking) => {
          return (
            <BookingHistoryCard
              key={booking.bookingId}
              arrivalDateTime={booking.arrivalDateTime}
              exitDateTime={booking.exitDateTime}
              externalMetadata={booking.externalMetadata}
              handleCancellation={() =>
                createCancellationAlert(
                  "Are you sure you want to cancel?",
                  handleCancellation,
                  booking.bookingId
                )
              }
            />
          );
        })
      ) : (
        <NothingFound message="You have no upcoming charger bookings" />
      )}
      <View opacity={0.4}>
        {pastBookings.length
          ? pastBookings.map((booking) => {
              return (
                <BookingHistoryCard
                  key={booking.bookingId}
                  arrivalDateTime={booking.arrivalDateTime}
                  exitDateTime={booking.exitDateTime}
                  externalMetadata={booking.externalMetadata}
                />
              );
            })
          : null}
      </View>
    </>
  );
}
