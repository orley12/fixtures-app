import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/constants';
/**
 * @param  {String} password
 * @returns {String} hashed password
 */
export const hashPassword = async password => bcrypt.hash(password, 10);

/**
 * @param  {String} userPass
 * @param  {String} hashedPass
 * @returns {Boolean} boolean
 */
export const comparePasswords = async (password, hashedPassword) => bcrypt.compare(password, hashedPassword);