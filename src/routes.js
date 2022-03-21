const express = require('express')
const routes = express.Router();

routes.get('/',(req,res)=>{
    req.getConnection((err,conn)=>{ //Recibe un posible error y la query a la bd
        if(err) res.send(console.log(err));

        conn.query('SELECT * FROM books',(err,rows)=>{//query con un callback con las filas y errores
            if(err) res.send(console.log(err));

            res.json(rows);//Devuelve los libros en un formato json
        }); 
        
    }); 
});

//Ruta para enviar datos a la bd
routes.post('/',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) res.send(console.log(err));

        console.log(req.body);

        conn.query('INSERT INTO books set ?',[req.body],(err,rows)=>{
            if(err) res.send(console.log(err));

            res.send('Libro Añadido');
        }); 
        
    });
});

//Ruta para eliminar datos a la bd
routes.delete('/:idbooks',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) res.send(console.log(err));

        console.log(req.body);

        conn.query('DELETE FROM books WHERE idbooks = ?',[req.params.idbooks],(err,rows)=>{
            if(err) res.send(console.log(err));

            res.send('Libro Eliminado');
        }); 
        
    });
});

//Ruta para actualizar datos a la bd
routes.put('/:idbooks',(req,res)=>{
    req.getConnection((err,conn)=>{
        if(err) res.send(console.log(err));

        console.log(req.body);

        //En los signos de interrogación se envían los datos del array, el body y el id
        conn.query('UPDATE books set ? WHERE idbooks = ?',[req.body, req.params.idbooks],(err,rows)=>{
            if(err) res.send(console.log(err)); 

            res.send('Libro Actualizado');
        }); 
        
    });
});

module.exports = routes;