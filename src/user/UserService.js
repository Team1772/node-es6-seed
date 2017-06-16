const UserModel = require('./UserModel');
const Convert = require('../helpers/Conversion');
const userType = require('./user.json');
const { serviceError } = require('../helpers/customError');

class UserService {

  static list() {
    return new Promise(async (resolve, reject) => {
      try {
        const list = await UserModel.list();
        if (!list.length === 0) {
          resolve([]);
        }
        const result = list.map(user => ({
          id: user.id,
          name: user.name,
          status: user.status,
          createdAt: Convert.toUnixEpoch(user.createdAt),
          updatedAt: Convert.toUnixEpoch(user.updatedAt),
          deletedAt: Convert.toUnixEpoch(user.deletedAt),
        }));
        resolve(result);
      } catch (err) {
        reject(serviceError('9738818108', err));
      }
    });
  }

  static get(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const [user] = await UserModel.get(data);
        if (!user) {
          resolve([]);
        }

        const result = [{
          id: user.id,
          name: user.name,
          status: user.status,
          createdAt: Convert.toUnixEpoch(user.createdAt),
          updatedAt: Convert.toUnixEpoch(user.updatedAt),
          deletedAt: Convert.toUnixEpoch(user.deletedAt),
        }];

        resolve(result);
      } catch (err) {
        reject(serviceError('2998861704', err));
      }
    });
  }

  static post(data) {
    data.status = userType.VALID;
    return UserModel.post(data);
  }

  static put(data) {
    return UserModel.put(data);
  }

  static delete(data) {
    return UserModel.delete(data);
  }
}

module.exports = UserService;
