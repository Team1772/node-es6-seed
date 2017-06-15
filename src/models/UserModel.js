const { utc } = require('moment');
const knex = require('../config/db');
const userType = require('../types/user');
const { modelError } = require('../helpers/customError');

class UserModel {

  static list() {
    return knex
    .from('user')
    .whereNot('user.status', userType.DELETED)
    .on('query-error', modelError('5953923595'));
  }

  static get(data) {
    return knex
    .from('user')
    .where('user.id', data.userId)
    .whereNot('user.status', userType.DELETED)
    .on('query-error', modelError('8060057052'));
  }

  static post(data) {
    return knex
    .from('user')
    .insert(data)
    .on('query-error', modelError('2515245253'));
  }

  static put(data) {
    const query = knex
    .from('user');

    if (data.name) {
      query.update('name', data.name);
    }

    query.where('user.id', data.userId)
    .whereNot('user.status', userType.DELETED)
    .on('query-error', modelError('1352434178'));

    return query;
  }

  static delete(data) {
    return knex
    .from('user')
    .where('user.id', data.userId)
    .whereNot('user.status', userType.DELETED)
    .update({
      status: userType.DELETED,
      deletedAt: utc().format('YYYY-MM-DD HH:mm:ss'),
    })
    .on('query-error', modelError('8686142858'));
  }

}

module.exports = UserModel;
