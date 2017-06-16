const Logger = require('../helpers/Logger');
const UserService = require('./UserService');

class UserController {

  static async list(req, res) {
    try {
      const list = await UserService.list();
      res.send({ success: true, list });
    } catch (err) {
      Logger.throw(res, `3272358416${err.number || ''}`, err);
    }
  }

  static async get(req, res) {
    try {
      const [user] = await UserService.get(req.params);
      if (!user) {
        res.send({ success: false, code: '7731668134', message: 'Usuário não encontrado' });
        return;
      }
      res.send({ success: true, user });
    } catch (err) {
      Logger.throw(res, `6001059324${err.number || ''}`, err);
    }
  }

  static async post(req, res) {
    try {
      const [user] = await UserService.post(req.body);
      res.send({ success: true, data: user });
    } catch (err) {
      Logger.throw(res, `2365958507${err.number || ''}`, err);
    }
  }

  static async put(req, res) {
    try {
      const data = {
        userId: req.params.userId,
        name: req.body.name,
      };

      const id = await UserService.put(data);
      if (!id) {
        res.send({ success: false, code: '7502749763', message: 'Usuário não encontrado' });
        return;
      }
      res.send({ success: true });
    } catch (err) {
      Logger.throw(res, `5768905470${err.number || ''}`, err);
    }

  }

  static async delete(req, res) {
    try {
      const id = await UserService.delete(req.params);
      if (!id) {
        res.send({ success: false, code: '9517673561', message: 'Usuário não encontrado' });
        return;
      }
      res.send({ success: true});
    } catch (err) {
      Logger.throw(res, `5768905476${err.number || ''}`, err);
    }
  }

}

module.exports = UserController;
