const mysql= require('mysql');

const mysqlConnection = mysql.createConnection({
//host: '127.0.0.1',
host: 'localhost',
user: 'root',
password: 'root',
database: 'dvicente',
//port: '33061' 
});

mysqlConnection.connect(function (err){
    if (err) {
        console.log(err,"este es el error encontrado");
	 return;
    }else{
        console.log("coneccion exitosa a la Bd")
    }
});

module.exports = mysqlConnection;
