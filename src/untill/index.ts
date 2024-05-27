export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result.split(",")[1]);
      } else {
        reject(new Error("FileReader result is not a string"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};
export function getImagePath(image: string) {
  let match = image.match(/movie_image\/([^\.]+)/);
  if (match) {
    let result = match[1];
    return result;
  } else {
    return "";
  }
}

export function getDateTimeDetails(convertDate: string) {
  console.log(convertDate);
  let date = new Date(convertDate);

  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthName = monthNames[date.getUTCMonth()];

  let day = date.getUTCDate();

  let hours = String(date.getUTCHours()).padStart(2, "0");
  let minutes = String(date.getUTCMinutes()).padStart(2, "0");
  let seconds = String(date.getUTCSeconds()).padStart(2, "0");
  let time = `${hours}:${minutes}:${seconds}`;

  return `${monthName} ${day} ${time} `;
}
