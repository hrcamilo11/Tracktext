/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {Client} client
 * @property {Product} product
 * @property {number} quantity
 * @property {Date} dueDate
 * @property {string} status
 * @property {Object} progress
 */

export default class Order {
    /**
     * @param {string} id
     * @param {Client} client
     * @param {Product} product
     * @param {number} quantity
     * @param {Date} dueDate
     * @param {string} status
     * @param {Object} progress
     */
    constructor(id, client, product, quantity, dueDate, status, progress) {
      this.id = id;
      this.client = client;
      this.product = product;
      this.quantity = quantity;
      this.dueDate = dueDate;
      this.status = status;
      this.progress = progress; // Object with dynamic keys
    }
  }