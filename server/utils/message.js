const moment = require('moment');


// mesajları yaratılan bir özellikle diğer sınıflarda kullanma amaçlanmıştır
let generateMessage =(from,text) => {
return {
from,
text,
createdAt: moment().valueOf()
         };
};
// Location bilgileri içinde bir özellik yaratılmıştır
let generateLocationMessage = (from, lat, lng) => {
    return {
      from,
      url: `https://www.google.com/maps?q=${lat}, ${lng}`,
      createdAt: moment().valueOf()  
    };
};

module.exports = {generateMessage, generateLocationMessage};