import * as Yup from 'yup'
import User from '../models/User'
import sequelize, { Op } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

class UserController {
  async store (req, res) {
    try {
      const schema = await Yup.object().shape({
        name: Yup.string().required(),
        lastname: Yup.string().required(),
        nickname: Yup.string().required(),
        address: Yup.string().required(),
        bio: Yup.string()
      })
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({
          message: 'Falha ao registrar o usuário, verifique se os dados estão preenchidos'
        })
      }
      const userExist = await User.findOne({
        where: { nickname: req.body.nickname }
      })
      if (userExist) {
        return res.status(400).json({ error: 'Nickname já existe no sistema' })
      }
      const usuario = req.body
      const id = uuidv4()
      if (usuario.nickname.length > 30) {
        return res.status(400).json({
          message: 'Nickname só pode ter 30 caracteres'
        })
      // eslint-disable-next-line eqeqeq
      } else if (usuario.bio != undefined && usuario.bio.length > 100) {
        return res.status(400).json({
          message: 'Bio só pode ter 100 caracteres'
        })
      }
      await User.create({
        id: id,
        name: usuario.name,
        lastname: usuario.lastname,
        nickname: usuario.nickname,
        address: usuario.address,
        bio: usuario.bio
      })
      return res.status(200).json({
        id: id,
        name: usuario.name,
        lastname: usuario.lastname,
        nickname: usuario.nickname,
        address: usuario.address,
        bio: usuario.bio
      })
    } catch (error) {
      res.status(500)
      res.json('Erro inesperado no servidor, tente novamente')
    }
  }

  async findByName (req, res) {
    try {
      const result = await User.findAll({
        where: {
          [Op.or]: {
            [Op.or]: [
              { name: req.params.key },
              { lastName: req.params.key }
            ],
            [Op.and]: {
              query: sequelize.where(
                sequelize.fn(
                  'concat',
                  sequelize.col('name'),
                  ' ',
                  sequelize.col('lastName')
                ),
                {
                  [sequelize.Op.like]: req.params.key
                }
              )
            }
          }
        }
      })
      // eslint-disable-next-line eqeqeq
      if (result == '') {
        return res.status(404).json({ message: 'Nenhum usuário encontrado com esse nome e/ou sobrenome' })
      }
      return res.status(200).json(result)
    } catch (error) {
      res.status(500)
      res.json('Erro inesperado no servidor, tente novamente')
    }
  }

  async findByNickname (req, res) {
    try {
      const result = await User.findOne({
        where: { nickname: req.params.key }
      })
      if (!result) {
        return res.status(400).json({ error: 'Nenhum usuário encontrado' })
      }
      return res.status(200).json({
        name: result.name,
        lastname: result.lastname,
        nickname: result.nickname
      })
    } catch (error) {
      res.status(500)
      res.json('Erro inesperado no servidor, tente novamente')
    }
  }

  async alterLastNameAddress (req, res) {
    try {
      const schema = await Yup.object().shape({
        lastname: Yup.string().required(),
        address: Yup.string().required()
      })
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({
          message: 'Falha ao registrar o usuário, verifique se os dados estão preenchidos'
        })
      }
      const { lastname, address } = req.body
      await User.update({ lastname: lastname, address: address }, {
        where: { id: req.params.id }
      })
      const retorno = await User.findOne({ where: { id: req.params.id } })
      if (!retorno) {
        return res.status(400).json({ error: 'Nenhum usuário encontrado' })
      }
      return res.status(200).json(retorno)
    } catch (error) {
      res.status(500)
      res.json('Erro inesperado no servidor, tente novamente')
    }
  }

  async alterNickname (req, res) {
    try {
      const schema = await Yup.object().shape({
        nickname: Yup.string().required()
      })
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({
          message: 'Falha ao registrar o usuário, verifique se os dados estão preenchidos'
        })
      }
      const idExist = await User.findOne({
        where: { id: req.params.id }
      })
      if (!idExist) {
        return res.status(400).json({ error: 'Id não encontrado' })
      }
      const { nickname } = req.body
      if (req.body.nickname.length > 30) {
        return res.status(400).json({
          message: 'Nickname só pode ter 30 caracteres'
        })
      }

      const userExist = await User.findOne({
        where: { nickname: nickname }
      })
      if (userExist) {
        return res.status(400).json({ error: 'Nickname já existe no sistema' })
      }
      await User.update({ nickname: nickname }, {
        where: { id: req.params.id }
      })
      const retorno = await User.findOne({ where: { id: req.params.id } })
      return res.status(200).json(retorno)
    } catch (error) {
      res.status(500)
      res.json('Erro inesperado no servidor, tente novamente')
    }
  }

  async delete (req, res) {
    try {
      const idExist = await User.findOne({
        where: { id: req.params.id }
      })
      if (!idExist) {
        return res.status(400).json({ error: 'Id não encontrado' })
      }
      await User.destroy({
        where: { id: req.params.id }
      })
      return res.status(200).json({ message: 'Usuário removido com sucesso.' })
    } catch (error) {
      res.status(500)
      res.json('Erro inesperado no servidor, tente novamente')
    }
  }
}

export default new UserController()
