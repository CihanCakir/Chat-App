/*[{
    id:'asdasdadasdasdadsad'
}]*/

//kullanıcıların belirli bir oda üzerinden mesajlaşmaları şuan mümkün join methodunu amacı buydu
// şimdi burada yapılan şey ise oluşturulan sınıf sayesinde her yeni sınıf için birbirinden bağımsız sınıflar oluşuturarak chat gruplarının bağımsızlığı
// sağlanmış olur yani konuşmalar karışmaz kullanıcı istediği odaya gider ve orada kalır....
// ve kullanıcılar bölümünde o odada bulunan kimselerin isimleri gözükür bir diziye atarak aşağıda belirtilmiştir ...
    constructor() {
      this.users = [];
    }
  
    addUser(id, name, room) {
      let user = {id, name, room};
      this.users.push(user);
      return user;
    }
  
    getUserList (room) {
      let users = this.users.filter((user) => user.room === room);
      let namesArray = users.map((user) => user.name);
  
      return namesArray;
    }
  
    getUser(id) {
      return this.users.filter((user) => user.id === id)[0];
    }
  
    removeUser(id) {
      let user = this.getUser(id);
  
      if(user){
        this.users = this.users.filter((user) => user.id !== id);
      }
  
      return user;
    }
  
  }
  
  module.exports = {Users};
