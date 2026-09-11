// const path = require('path')
const mongoose = require("mongoose");
const prodects = require('../models/Prodects')
const User = require('../models/User')
const cloudinary = require("../utils/cloudinary");

const fs = require('fs');

exports.addprodect = (req, res) => { res.render('add_prodect', { title: 'اضافه سلعه' }) }

exports.addproPost = async (req, res, next) => {
    try {
        req.body.user = req.user.id
        const prodect = req.body
        let imageURIs = []
        let image = req.files
        if (image) {
            let multiplePicturePromise = image.map((picture) => cloudinary.uploader.upload(picture.path))
            let imageResponses = await Promise.all(multiplePicturePromise);
            imageResponses.map(x => imageURIs.push(x.secure_url))
        }
        if (req.files) prodect.image = imageURIs
        const x = await new prodects(prodect)
        await x.save()
        res.redirect('/')
    } catch (err) { console.log(err); res.render('error/500') }
}

exports.showMyPro = async (req, res) => {
    try {
        const march = await prodects.find({ user: req.user._id }).sort({ createdAt: 'desc' })
        res.render('myProdects', { march, title: 'منتجاتي ' })
    } catch (err) { console.log(err); res.render('error/500') }
}

exports.showOnePro = async (req, res) => {
    try {
        const e = await prodects.findById(req.params.id).populate('user').lean()
        const post = await prodects.findById(req.params.id);
        if (req.user) {
            const x = post.Favorite.some((like) => like.toString() === req.user.id)
            res.render('pages/prodect', { e, x, title: e.name, })
        }
        if (!req.user) {
            const x = post.Favorite.some((like) => like.toString() === '')
            res.render('pages/prodect', { e, x, title: e.name, })
        }
    } catch (err) { console.log(err); res.render('error/500') }
}

exports.deletePro = async (req, res) => {
    try {
        await prodects.findByIdAndRemove({ _id: req.params.id })
        res.redirect('/prodects/myProdects')
    } catch (err) { console.log(err); res.render('error/500') }
}

exports.Favorite = async (req, res) => {
    try {
        const post = await prodects.findById({_id:req.params.id});
        if (post.Favorite.some((like) => like.toString() === req.user.id)) {
            req.flash('success_msg','  تمت الاضافه مسبقا')
            res.redirect(`/prodects/${req.params.id}`)
        } else {
            post.Favorite.unshift(req.user.id);
            await post.save();
            req.flash('success_msg',' تمت الاضافه بنجاح');
            res.redirect(`/prodects/${req.params.id}`);
        }
    } catch (err) { console.error(err); res.render('error/500') }
}

exports.unFavorite = async (req, res) => {
    try {
        const post = await prodects.findById({ _id: req.params.id });
        if (!post.Favorite.some((like) => like.toString() === req.user.id)) return res.status(400).json({ msg: 'Post has not yet been liked' });
        post.Favorite = post.Favorite.filter((l) => l.toString() !== req.user.id);
        await post.save();
        req.flash('success_msg',' تمت الازالة بنجاح');
        res.redirect(`/prodects/${req.params.id}`);
    } catch (err) { console.error(err); res.render('error/500') }
}

exports.addreport = async (req, res) => {
    try {
        const post = await prodects.findById({ _id: req.params.id });
        post.report.unshift('444');
        await post.save();
        req.flash('success_msg',' تمت الابلاغ بنجاح سيتم التحقق من المنشور قريبا ... نشكرك');
        res.redirect(`/prodects/${req.params.id}`);
    } catch (err) { console.error(err); res.render('error/500') }
}

exports.addfavorite = async (req, res) => {
    try {
        const rep = await Favorite.find({ Fav: req.params.id })
        if (rep.some((Rep) => Rep.Fav.toString() === req.params.id)) {
            req.flash('success_msg','  تمت الاضافه مسبقا')
            res.redirect(`/prodects/${req.params.id}`)
        }
        const r = new Favorite({ Fav: req.params.id, user: req.user.id })
        await r.save();
        console.log(r);
        req.flash('success_msg',' تمت الاضافه بنجاح');
        res.redirect(`/prodects/${req.params.id}`);
    } catch (err) { console.log(err); res.render('error/500') }
}
