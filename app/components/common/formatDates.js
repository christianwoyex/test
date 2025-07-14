export function convertISOToDate(isoString) {
    const date = new Date(isoString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate() ).padStart(1, "0");
    return `${year}-${month}-${day}`;
  }

 export function formatToISO(dateString) {
	const date = new Date(dateString);
	return date.toDateString(); 
  }
  
  export function convertISOToReadableDate(isoString) {
    const date = new Date(isoString);
  
    return date.toUTCString(); 
  }


  export function convertToYYYYMMDD(dateString) {
 const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  // Extract the year, month, and day in **UTC**
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Ensure two digits
  const day = String(date.getUTCDate() + 1 ).padStart(2, "0");

  return `${year}-${month}-${day}`;
  
    
  }

 export function addOneDay(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error("Invalid Date object");
    }
   
    const newDate = new Date(date);
    
    // Add 1 day
    newDate.setDate(newDate.getDate() + 1);
  
    return newDate;
  }
  
 export const convertToFullDateString = (dateString) => {
    const dateParts = dateString.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; 
    const day = parseInt(dateParts[2], 10);
    const date = new Date(year, month, day);
    return date.toString();
  };

  export const convertToDateObject = (dateString) => {
    return new Date(dateString);
  };

 export const formatDateToYYYYMMDDMain = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const day = String(date.getDate()).padStart(2, "0"); 
  return `${year}-${month}-${day}`
  };