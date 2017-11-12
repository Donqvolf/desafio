const mysql = require('mysql');

class Heartbeat {

      constructor(trx) {
            this.trx = trx;
      }

      async getSingleId({ row_id = 0 }) {

      }

      async retrieveAll({ offset = 0, limit = 15 }) {

      }

      async softDelete({ ids = [] }) {

      }

      async insertInto({ columns, data }) {

      }

      async retrieveAllBy({ column, value }) {

      }

};

module.exports = Heartbeat;