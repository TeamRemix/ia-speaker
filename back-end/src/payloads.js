const payloadUserStructure = {
  username: '',
  nAttempts: process.env.ATTEMPTS_USER_NORMAL,
}

const payloadGuestStructure = {
  idguest: '',
  username: 'guest',
  nAttempts: process.env.ATTEMPTS_GUEST
}

module.exports = {
  payloadUserStructure,
  payloadGuestStructure
}
