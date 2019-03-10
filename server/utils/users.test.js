const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: "1",
      name: "Yagmur",
      room: "Elite IK"
    },{
      id: "2",
      name: "Mustafa",
      room: "Elite Teknik"
    },{
      id: "3",
      name: "veysel",
      room: "Elite IK"
    }]
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: "HSCC",
      name: "CC",
      room: "CEO"
    };

    let reUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('IK uyelerini dondurmelı', ()=>{
    let userList = users.getUserList('Elite IK');

    expect(userList).toEqual(['Yagmur', 'Veysel']);
  });

  it('Teknik uyelerını dondurmelı', ()=>{
    let userList = users.getUserList('Elite Teknik');

    expect(userList).toEqual(['Mustafa']);
  });

  it('kullanıcı bulmalı', () => {
    let userID = '2',
        user = users.getUser(userID);

    expect(user.id).toBe(userID);
  });

  it('kullanıcıyı bulmamalı', () => {
    let userID = '150',
        user = users.getUser(userID);

    expect(user).toBeUndefined();
  });

  it('kullaniciyi cikarmamali', () => {
    let userID = '108',
        user = users.removeUser(userID);

    expect(user).toBeUndefined();
    expect(users.users.length).toBe(3);
  });

  it('kullaniciyi cikarmali', () => {
    let userID = '1',
        user = users.removeUser(userID);

    expect(user.id).toBe(userID);
    expect(users.users.length).toBe(2);
  });
});
