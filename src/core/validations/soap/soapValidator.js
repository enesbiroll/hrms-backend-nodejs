const soap = require("soap");

const turkishToUpper = (text) => {
  const letters = { 'i': 'İ', 'ş': 'Ş', 'ğ': 'Ğ', 'ü': 'Ü', 'ö': 'Ö', 'ç': 'Ç', 'ı': 'I' };
  text = text.replace(/i|ş|ğ|ü|ö|ç|ı/g, letter => letters[letter]);
  return text.toUpperCase().replace(/\s+/g, '');
};

const turkishValidator = async (identity_number, name, surname, birth_date) => {
  const ADRES = "https://tckimlik.nvi.gov.tr/service/kpspublic.asmx?WSDL";
  const degerler = {
    TCKimlikNo: identity_number,
    Ad: turkishToUpper(name),
    Soyad: turkishToUpper(surname),
    DogumYili: new Date(birth_date).getFullYear(), // Sadece yılı alın
  };

  return new Promise((resolve, reject) => {
    soap.createClient(ADRES, (err, client) => {
      if (err) {
        console.error("SOAP Client Error:", err);
        return reject(false);
      }
      client.TCKimlikNoDogrula(degerler, (err, result) => {
        if (err) {
          console.error("SOAP Request Error:", err);
          return reject(false);
        }
        resolve(result.TCKimlikNoDogrulaResult);
      });
    });
  });
};

module.exports = { turkishValidator };