var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');

var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'ibm',
	port:3300

});
connection.connect(function(error){
	if(!!error)
		console.log('Error DB connection');
	else
		console.log('DB connected');
});

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("home pahge")
  	res.render('index', { title: 'Express' });
});

// router.get('/new_request', function(req, res, next) {
// 	console.log("home pahge")
//   	res.render('newrequest', { title: 'Express' });
// });

// router.get('*', function(req, res, next) {
//   	res.render('index', { title: 'Express' });
// });

router.get('/user',function(req,res){
	res.send("now u r in user page")
})

router.post('/login', function(req, res, next) {
    var sess = req.session;
	var requser = req.body.data.user;
	var hash = bcrypt.hashSync(req.body.password);
	if(requser.email )
	connection.query("SELECT * FROM users where email = '"+requser.email +"' " ,function(error, rows, fields,results){
		if(rows.length == 0) {
			console.log("wrong password")
			res.send({ redirect:"/"});
		} else {
			console.log("====================")
			console.log(rows[0])
			console.log("=====================")
			var passcheck  = bcrypt.compareSync(requser.password, rows[0]['password']);
			console.log('login password: ', requser.password, ' password in db: ',  rows[0]['password'], ' match status: ',passcheck , 'rows:',rows);
			if(passcheck == true) {

				if(rows[0]['role']==0){
                    console.log("user zero==========")
                    res.send({ redirect:"/home"});

				}else if(rows[0]['role']==1){
                    console.log("approver one==========")
                    res.send({ redirect:"/approver"});
				}else if(rows[0]['role']==2){
                    console.log("role admin 2==========")
                    res.send({ redirect:"/admin"});
				}

			} else {
				res.send({ redirect:"/"});
			}
	}
   	});	
});

router.post('/signup', function(req, res, next) {
    var requser = req.body.data.user;
    var hash = bcrypt.hashSync(req.body.data.user.password);
    // console.log(req.body);
   // console.log(requser.role)
    if (requser.role == 0){
        connection.query('INSERT INTO users (name, email, password,role) values("' + requser.name + '","' + requser.email + '","' + hash + '","' + requser.role + '")', function (error, rows) {
            if (error) {
                console.log("error ocurred", error);
            }
            //console.log(rows);
        });
}
else {
        connection.query('INSERT INTO approver (name, email, password,role) values("' + requser.name + '","' + requser.email + '","' + hash + '","' + requser.role + '")', function (error, rows) {
            if (error) {
                console.log("error ocurred", error);
            }
            //console.log(rows);
        });
	}
});

router.get('/emailcheck', function(req, res, next) {
	connection.query('SELECT * FROM users WHERE email ="' + req.query.email + '"',function(error, rows){
		if(rows.length == 0) {
			res.send(true);
		} else {
			res.send(false);
		}
	})
});

// router.post('/home',function(req,res,next){
// 	console.log("back to home do");
// });

router.post('/new_request', function(req,res,next){
	var d = new Date();
connection.query('INSERT INTO build_req (abstract,pmr,deliver_list,req_date,rtc_workspace,platform,defect,comment,customer_name,req_type,version,apar) values ("' + req.body.abstract + '","' + req.body.pmr + '","' + req.body.deliver + '","'+d+'","' + req.body.rtc + '","' + req.body.platform + '","' + req.body.defect + '","' + req.body.comment + '","'+req.body.customer+'","'+req.body.req_type+'","'+req.body.version+'","'+req.body.apar+'")', function(error,rows) {
    if (error) {
        console.log("error ocurred", error)
    }
    console.log(req.body.rtc);
    console.log((new Date()));
    res.send({ redirect:"/home"});
	})//connection.query('INSERT INTO build_req (build_status) values ()')
});


 router.get(function(req,res,next){
	connection.query('SELECT * FROM build_req',function(error,rows)
    {
        if (error) {
            console.log("error")
        }
    //     console.log(rows)
     res.send(rows)
    })

});

// router.get('/python',function (req,res,next){
//     // console.log(req.body.rtc);
// // Use python shell
//     var PythonShell = require('python-shell');
//     var options = {
//         mode: 'text',
//         pythonPath: 'C:/python27/python.exe',
//         pythonOptions: ['-u'],
//         scriptPath: 'C:/Python27',
//         args: []
//
//     };
//     PythonShell.run('test2.py', options, function (err, results) {
//         if (err) throw err;
//         // results is an array consisting of messages collected during execution
//         console.log('results: %j', results);
//     });
//     res.send("executed")
// });

// router.get ('/new_req',function( req,res,next){
// 	console.log(back)
// })
module.exports = router;
