// timeDiff.js
export const timeDifference = (current, previous) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
  
    const elapsed = current - previous;
  
    if (elapsed < msPerMinute) {
      return `${Math.round(elapsed / 1000)} seconds ago`;
    } else if (elapsed < msPerHour) {
      return `${Math.round(elapsed / msPerMinute)} minutes ago`;
    } else if (elapsed < msPerDay) {
      return `${Math.round(elapsed / msPerHour)} hours ago`;
    } else if (elapsed < msPerMonth) {
      return `${Math.round(elapsed / msPerDay)} days ago`;
    } else if (elapsed < msPerYear) {
      return `${Math.round(elapsed / msPerMonth)} months ago`;
    } else {
      return `${Math.round(elapsed / msPerYear)} years ago`;
    }
  };
  
  export const formatDuration=(seconds)=> {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    //console.log(minutes,'minutes', remainingSeconds,'seconds')
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

  export const VideoTitle = ( title,len ) => {
    // Function to process the title based on its length
    // const formatTitle = (title,len) => {
      if (title.length > len) {
        return `${title.substring(0, len)}...`;
      }
      return title;
    // };
  
    // return formatTitle(title,len);
  };