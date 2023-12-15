/// Helper function that checks password correctness based on bcrypt encryption/decryption mechanism
export async function checkPassword(password: string, encryptedPassword: string) {
    const bcrypt = require('bcrypt')
    return await bcrypt.compare(password, encryptedPassword)
}

