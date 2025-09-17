const User = require('../models/User');
const jwt = require('jsonwebtoken');

class AuthService {
  static async register({ Firstname, Lastname, Email, Password }) {
    const userExists = await User.findOne({ Email });
    if (userExists) {
      throw new Error('Email đã tồn tại');
    }
å
    const user = new User({ Firstname, Lastname, Email, Password });
    await user.save();
    return { message: 'Đăng ký thành công' };
  }

  static async login({ Email, Password }) {
    const user = await User.findOne({ Email });
    if (!user) throw new Error('Email không tồn tại');

    const isMatch = await user.matchPassword(Password);
    if (!isMatch) throw new Error('Mật khẩu không đúng');

    const token = jwt.sign({ id: user._id, email: user.Email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
  }
}

module.exports = AuthService;
