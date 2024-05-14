const formatDate = (createdAtString) => {
    console.log(createdAtString)
    const date = new Date(createdAtString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = (day < 10) ? `0${day}` : day;
    const formattedMonth = (month < 10) ? `0${month}` : month;
    const formattedHours = (hours < 10) ? `0${hours}` : hours;
    const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;

    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
};

const formatToJustDate = (createdAtString) => {
    console.log(createdAtString)
    const date = new Date(createdAtString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = (day < 10) ? `0${day}` : day;
    const formattedMonth = (month < 10) ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
};

const getRoleText = (role) => {
    switch (role) {
      case 'student':
        return 'Student';
      case 'academic_staff':
        return 'Academic';
      case 'administrative_staff':
        return 'Administrative Staff';
      case 'admin_user':
        return 'Admin User'
      default:
        return 'Unknown';
    }
  }

export { formatDate, formatToJustDate, getRoleText };