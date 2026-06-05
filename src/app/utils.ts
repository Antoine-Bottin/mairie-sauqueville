export const formatEventDate = (dateString: string) => {
  const date = new Date(dateString);

  return (
    date.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }) +
    " à " +
    date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
};

export const getRandomColor = () =>
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
