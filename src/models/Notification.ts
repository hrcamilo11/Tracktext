/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {string} type - 'info', 'warning', 'error', etc.
 * @property {string} message
 * @property {Date} date
 * @property {boolean} read
 */

export default class Notification {
    /**
     * @param {string} id
     * @param {string} type - 'info', 'warning', 'error', etc.
     * @param {string} message
     * @param {Date} date
     * @param {boolean} read
     */
    constructor(id, type, message, date, read) {
      this.id = id;
      this.type = type;
      this.message = message;
      this.date = date;
      this.read = read;
    }
  }