//function connection() {
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://textile_management:textile_management_123@cluster0.gsmsq.mongodb.net/Stitches_and_Curves?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(()=>{console.log('connected')})
.catch(()=>{console.log('not connected')})





//}
