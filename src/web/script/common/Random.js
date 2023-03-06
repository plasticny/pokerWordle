class Random {
    // gen random int from min to max, exclude max
    static getRanInt(min, max) {
        return Math.floor(Math.random()*(max-min))+min;
    }

    // randomize a array
    // method:
    //      1. split the list to two parts
    //      2. add node into new array in turn, one each turn
    //      3. replace the origin array with new array
    //      4. repeat step 1-3 for 10 times
    static randomizeArray(array) {
        for(let idx = 0; idx < 5; ++idx) {
            let mid = this.getRanInt(Math.ceil(array.length*0.45), Math.ceil(array.length*0.55)-1);
            let new_arr = new Array();

            let i = 0, j = mid;
            let isIdxEven = idx%2 == 0;
            while(i < mid || j < array.length) {
                if(isIdxEven) {
                    if(i < mid) {
                        new_arr.push(array[i++]);
                    }
                    if(j < array.length) {
                        new_arr.push(array[j++]);
                    }
                } else {
                    if(i < mid) {
                        new_arr.push(array[i++]);
                    }
                    if(j < array.length) {
                        new_arr.push(array[j++]);
                    }                    
                }
            }

            array = new_arr;
        }
        return array;
    }
}