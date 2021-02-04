export const apiRequestHeaders = (accessToken: string) => {
  return {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    Authorization: "Bearer " + accessToken,
  }
}

export const euAddress = {
  city: "Cogorno",
  country: "Italy",
  countryCode: "IT",
  firstName: "Darth",
  lastName: "Vader",
  line1: "Via Morte Nera, 13",
  phone: "+39 055 1234567890",
  stateCode: "GE",
  zipCode: "16030",
  // other_phone: '+39 055 0987654321',
  // billing_info: 'ABCDEFGHIJKLMNOPQRSTUVWYXZ',
}

export const euAddress2 = {
  city: "Canguro",
  country: "Italy",
  countryCode: "IT",
  firstName: "Spider",
  lastName: "Man",
  line1: "Ragnatela, 99",
  phone: "+39 010 010101010",
  stateCode: "RN",
  zipCode: "32100",
  // other_phone: '+39 055 0987654321',
  // billing_info: 'ABCDEFGHIJKLMNOPQRSTUVWYXZ',
}
