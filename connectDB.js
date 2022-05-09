const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Ckeditor5', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Schema = mongoose.Schema;

// const account = new Schema({
//   username: String,
//   password: String
// }, {
//     collection: 'Account'
// });

// const AccountModel = mongoose.model('account', account);

// // Tìm kiếm trong DB
// AccountModel.find({})
// .then( data => {
//     console.log('Data: ', data);
// } )
// .catch( err => {
//     console.log('Lỗi: ', err);
// })

// Thêm vào DB
// AccountModel.create({
//     username: 'thanh',
//     password: 'password1'
// }).then( data => {
//     console.log(data);
// })
// .catch( err => {
//     console.log('Lỗiii');
// })

const BlogSchema = new Schema({
    blogId: String,
    userId: String,
    content: String
}, {
    collection: 'Blog'
})
const BlogModel = mongoose.model('Blog', BlogSchema)

BlogModel.find({
  userId: "1",
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
