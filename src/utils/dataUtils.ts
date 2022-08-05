import bcrypt from 'bcrypt';

export const encryptPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
    const encryptPassword = bcrypt.hashSync(password, salt);
    return encryptPassword;
}

export const comparePassword = (password: string, encryptPassword: string) => {
    const isValid = bcrypt.compareSync(password, encryptPassword);
    return isValid;
}