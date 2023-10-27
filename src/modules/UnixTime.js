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
}

export default UnixTimeConverter;
