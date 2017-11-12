const Model = app.model.main;

class Travel extends Model {

      constructor(trx) {
            super(trx);
      }

      /**
       * Retrieves the level of a travel from an UF x to an UF y.
       */
      async getLevel({ from_uf, to_uf }) {

            const sql = 'SELECT JSON_EXTRACT(`target`, CONCAT("$.", ?)) AS `level` \
                         FROM `travel` WHERE `from_uf` = ? LIMIT 1';

            const params = [to_uf.toUpperCase(), from_uf.toUpperCase()];
            const [rows] = await this.trx.query(sql, params);
            return rows[0]['level'];

      }

}

module.exports = Travel;