class UnixTimeConverter {
  static unixTimestampToDateString(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);

    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("en-Us", options);
  }

  static unixTimestampToTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    const formattedHours = hours % 12 || 12;

    const timeString = `${formattedHours}:${String(minutes).padStart(
      2,
      "0",
    )} ${ampm}`;

    return timeString;
  }

  static unixTimestampToMonthDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}/${day}`;
  }

  static unixTimestampToDateOfWeek(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Correctly converted from seconds to milliseconds

    const options = {
      weekday: "short",
    };

    return date.toLocaleDateString("en-US", options);
  }
}

export default UnixTimeConverter;
