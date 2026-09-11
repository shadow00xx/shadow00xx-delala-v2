const path = require('path');
const User = require('../models/User')
const passport = require('passport');
const bcrypt = require('bcryptjs');
const prodects = require('../models/Prodects')
let errors = []

exports.login = (req, res) => { res.render('pages/login', { title: ' تسجيل الدخول',layout:"layouts/register" }) }
exports.signup = (req, res) => { res.render('pages/signup', { title: ' التسجيل',layout:"layouts/register" }) }

exports.signupPost = async (req, res) => {
    try {
        const { displayName, username, password } = req.body
        const user = await User.findOne({ username: username })
        if (user) {
            errors.push({ msg: 'المستخدم موجود بالفعل' })
            res.render('pages/signup', { errors })
        } else {
            const newUser = await new User({ displayName, username, password, })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash
                    console.log(newUser)
                    await newUser.save()
                })
            })
            req.flash('success_msg','تم التسجيل بنجاح');
            res.redirect('/user/login')
        }
    } catch (err) { console.log(err) }
}

exports.loginPost = (req, res, next) => {
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/user/login', failureFlash: true })(req, res, next);
}

exports.profile = async (req, res) => { res.render('profile', { user:req.user, title: 'الملف الشخصي' }) }

const mongoose = require("mongoose");
const fs = require('fs');
const cloudinary = require("../utils/cloudinary");

exports.editProfile = async (req, res) => {
    try {
        let user = await User.find({ _id: req.user.id }).lean()
        const v = req.body
        user = await User.findOneAndUpdate({ _id: req.user.id }, v, { new: true, runValidators: true })
        res.redirect('/')
    } catch (err) { console.error(err); return res.render('error/500') }
}

exports.logout = (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        res.redirect("/user/login");
    });
}

exports.showUsersMyProfile = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).lean()
        const userpro = await prodects.find({user:req.params.id }).populate('user').lean()
        res.render('pages/showUsersMyProfile', { user,userpro, title: 'الملف الشخصي' })
    } catch (error) { console.error(error); return res.render('error/500') }
}

exports.editPro = async (req, res) => {
    try {
      let checkUser = await User.findById({id:req.user.id})
      if (!checkUser) return res.send('error/404')
      if (checkUser != req.user.id) res.redirect('/')
      else {
        checkUser = await User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true })
        res.redirect('/')
      }
    } catch (err) { console.error(err); return res.render('error/500') }
}
