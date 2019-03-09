let isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
}
module.exports = {isRealString}; // yaratılan isRealString modülünün amacı inputlara girilen değerlerin tamamen silinmesi empty olmasını sağlamaktır