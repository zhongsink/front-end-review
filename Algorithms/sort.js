function quick_sort (arr) {
    
    if (arr.length<1) return arr; 

    let left=[] ,
    right=[],
    provit=arr[0];

    for (let i=1; i<arr.length;i++) {
        if (arr[i]>provit)
            right.push(arr[i]);
        else {
            left.push[arr[i]]
        }
     }
    return quick_sort(left).concat([provit], quick_sort(right));

}

function res (arr,up_or_down) {
    if(up_or_down)
        return quick_sort(arr);
    else
        return Array.prototype.reverse.apply(this,quick_sort(arr));

}

res([1,2,6,5,7,9],true);








