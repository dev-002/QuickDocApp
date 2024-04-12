export default function (doc) {
  const date = new Date();
  console.log(doc.leaveDays)
  let day = [date.getDate(), date.getMonth(), date.getFullYear].join("-");
  return doc.leaveDays.includes(day) ? false : true;
}
