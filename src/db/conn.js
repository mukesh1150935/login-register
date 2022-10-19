const mongoose =require('mongoose');
const DB='mongodb+srv://mukesh_singh_09:Msr1150935%40@cluster0.q4kdqu1.mongodb.net/studentBackend?retryWrites=true&w=majority'
mongoose.connect(DB,).then(()=>{
    console.log(`connection successfully`);
}).catch((e)=>{
    console.log(`no connection`,e)
});