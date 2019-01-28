
const app = require('./app')

//settings
app.set('port', process.env.PORT || 3000);

//star servidor
const server = app.listen(app.get('port'), () => {
    console.log('server', app.get('port'));
});

//Iosocket
const SocketIO = require('socket.io');
const IO = SocketIO(server);

IO.on('connection', (socket) => {

    console.log('se conecto alguien', socket.id);

    socket.on('open', (mensaje) =>{
        socket.broadcast.emit('open','usuario conectado: '+mensaje+'..');
    })

    

    socket.on('disconnect', () =>{
        console.log("se desconecto un usuario", socket.id)
        socket.broadcast.emit('close','usuario desconectado '+socket.id+'..');
    })
    

    socket.on('nuevoempleado', (empleado) => {

        console.log(empleado);
        IO.emit('nuevoempleadocreado', empleado);

    });

});