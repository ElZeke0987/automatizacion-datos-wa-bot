export function compareListList(list1= [], list2= []){
    let toReturn;
    list1.forEach(item1 => {
        console.log(list2)
        toReturn=list2.find((item2)=>{return item2===item1})
        console.log(toReturn)
    });
    return toReturn;
}

export function filteringText(str) {

    return /^[a-zA-Z]$/.test(str);
}