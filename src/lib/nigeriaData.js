export const NIGERIAN_STATES = [
  { name: "FCT Abuja", code: "FCT", capital: "Abuja" },
  { name: "Abia", code: "AB", capital: "Umuahia" },
  { name: "Adamawa", code: "AD", capital: "Yola" },
  { name: "Akwa Ibom", code: "AK", capital: "Uyo" },
  { name: "Anambra", code: "AN", capital: "Awka" },
  { name: "Bauchi", code: "BA", capital: "Bauchi" },
  { name: "Bayelsa", code: "BY", capital: "Yenagoa" },
  { name: "Benue", code: "BE", capital: "Makurdi" },
  { name: "Borno", code: "BO", capital: "Maiduguri" },
  { name: "Cross River", code: "CR", capital: "Calabar" },
  { name: "Delta", code: "DE", capital: "Asaba" },
  { name: "Ebonyi", code: "EB", capital: "Abakaliki" },
  { name: "Edo", code: "ED", capital: "Benin City" },
  { name: "Ekiti", code: "EK", capital: "Ado-Ekiti" },
  { name: "Enugu", code: "EN", capital: "Enugu" },
  { name: "Gombe", code: "GO", capital: "Gombe" },
  { name: "Imo", code: "IM", capital: "Owerri" },
  { name: "Jigawa", code: "JI", capital: "Dutse" },
  { name: "Kaduna", code: "KD", capital: "Kaduna" },
  { name: "Kano", code: "KN", capital: "Kano" },
  { name: "Katsina", code: "KT", capital: "Katsina" },
  { name: "Kebbi", code: "KE", capital: "Birnin Kebbi" },
  { name: "Kogi", code: "KO", capital: "Lokoja" },
  { name: "Kwara", code: "KW", capital: "Ilorin" },
  { name: "Lagos", code: "LA", capital: "Ikeja" },
  { name: "Nasarawa", code: "NA", capital: "Lafia" },
  { name: "Niger", code: "NI", capital: "Minna" },
  { name: "Ogun", code: "OG", capital: "Abeokuta" },
  { name: "Ondo", code: "ON", capital: "Akure" },
  { name: "Osun", code: "OS", capital: "Osogbo" },
  { name: "Oyo", code: "OY", capital: "Ibadan" },
  { name: "Plateau", code: "PL", capital: "Jos" },
  { name: "Rivers", code: "RI", capital: "Port Harcourt" },
  { name: "Sokoto", code: "SO", capital: "Sokoto" },
  { name: "Taraba", code: "TA", capital: "Jalingo" },
  { name: "Yobe", code: "YO", capital: "Damaturu" },
  { name: "Zamfara", code: "ZA", capital: "Gusau" },
];

export function getStateCode(stateName) {
  const state = NIGERIAN_STATES.find(
    (s) => s.name.toLowerCase() === stateName.toLowerCase()
  );
  return state ? state.code : "XX";
}

export function generateMemberId(stateCode) {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `FMN-${stateCode}-${year}-${random}`;
}