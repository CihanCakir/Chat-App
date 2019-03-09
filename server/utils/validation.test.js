const expect = require('expect');

const {isRealString} = require('./isRealString');

describe('is Real String ', () =>{
it('Karakter kabul edilemez değerde', () => {
    let res = isRealString(65);
    expect(res).toBe(false);

});
it('Sadece yazı karakterleri kabuledilir', () => {
    let res = isRealString('           ');
    expect(res).toBe(false);
});
it('karakterler arası boşluk bırakmadan yazınız', () => {
    let res = isRealString('       CC         ');
    expect(res).toBe(true);
});



});

//inputlara girilen değerleri kontrol etmek amaçlı oluşturulmuştur buradan güvenlik için alınabilecek önlemler listelenebilir
