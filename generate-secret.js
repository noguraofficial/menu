// Generate secret key for production
const crypto = require('crypto')

function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('base64')
}

const secret = generateSecret(32)
console.log('🔐 Generated NEXTAUTH_SECRET:')
console.log(secret)
console.log('')
console.log('📋 Add this to your Netlify environment variables:')
console.log('NEXTAUTH_SECRET=' + secret)
console.log('')
console.log('⚠️  Keep this secret safe and never commit it to version control!')
