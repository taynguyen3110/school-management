var majorityElement = function (nums) {
    let occurence = {};
    for (let i = 0; i < nums.length; i++) {
        if (!occurence[nums[i]]) {
            occurence[nums[i]] = 1;
        } else {
            occurence[nums[i]]++;
        }
    }
    let num = 0;
    for (const [key, value] of Object.entries(occurence)) {
        if (value > nums.length / 2) {
            num = key;
        }
    }
    return num;
};

console.log(majorityElement([2,2,1,1,1,1,1,1,1,2,2]));
