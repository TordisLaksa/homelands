//Ændrer tal til tusindtal seperator
export const PriceToDK = (num) => {
    return Number(num).toLocaleString('da-DK')
}

//Ændrer min dato til Dag(dato) - Måned - År
export const ConvertedDate = (date) => {
    const month = [
        "Januar", "Februar", "Marts", 
        "April", "Maj", "Juni", 
        "Juli", "August", "September", 
        "Oktober", "November", "December"
    ];
        
    let myDate = new Date(date)
    
    return myDate.getDate() + '. ' + month[myDate.getMonth()] + ' ' + myDate.getFullYear();
}

