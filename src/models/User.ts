/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 * @property {string} password
 * @property {string} email
 * @property {string} phone
 * @property {string} role - 'admin', 'employee', or 'client'
 */

export default class User {
    /**
     * @param {string} id
     * @param {string} username
     * @param {string} password
     * @param {string} email
     * @param {string} phone
     * @param {string} role - 'admin', 'employee', or 'client'
     */
    constructor(id, username, password, email, phone, role) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.email = email;
      this.phone = phone;
      this.role = role;
    }
  }
  