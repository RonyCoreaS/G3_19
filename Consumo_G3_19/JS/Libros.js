var UrlLibros = 'http://20.216.41.245:90/G3_19/controller/libro.php?opc=GetLibros';
var UrlInsertLibro = 'http://20.216.41.245:90/G3_19/controller/libro.php?opc=InsertLibro';
var UrlGetLibro = 'http://20.216.41.245:90/G3_19/controller/libro.php?opc=GetLibro';
var UrlUpdateLibro = 'http://20.216.41.245:90/G3_19/controller/libro.php?opc=UpdateLibro';
var UrlDeleteLibro = 'http://20.216.41.245:90/G3_19/controller/libro.php?opc=DeleteLibro';

$(document).ready(function(){
    CargarLibros();
});

function CargarLibros(){
    $.ajax({
        url: UrlLibros,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';

            for(i=0; i < MiItems.length; i++){
                 Valores += '<tr>'+
                 '<td>'+ MiItems[i].CODIGO_DE_LIBRO +'</td>'+
                 '<td>'+ MiItems[i].NOMBRE_LIBRO +'</td>'+
                 '<td>'+ MiItems[i].NOMBRE_ESCRITOR +'</td>'+
                 '<td>'+ MiItems[i].FECHA_PUBLICACION +'</td>'+
                 '<td>'+ MiItems[i].ISBN +'</td>'+
                 '<td>'+ MiItems[i].PRECIO +'</td>'+
                 '<td>'+ MiItems[i].EDITORIAL +'</td>'+
                 '<td>'+ 
                 '<button class="btn btn-info" onclick="CargarLibro('+ MiItems[i].CODIGO_DE_LIBRO +')">Editar</button>'+
                 '</td>'+
                 '<td>'+ 
                 '<button class="btn btn-danger" onclick="EliminarLibro('+ MiItems[i].CODIGO_DE_LIBRO +')">Eliminar</button>'+
                 '</td>'+
            '</tr>';
            $('#DataLibros').html(Valores); 
            }
        }
    });
}

function AgregarLibro(){
    var datoslibro ={
    CODIGO_DE_LIBRO: $('#CODIGO_DE_LIBRO').val(),
    NOMBRE_LIBRO: $('#NOMBRE_LIBRO').val(),
    NOMBRE_ESCRITOR: $('#NOMBRE_ESCRITOR').val(),
    FECHA_PUBLICACION: $('#FECHA_PUBLICACION').val(),
    ISBN: $('#ISBN').val(),
    PRECIO: $('#PRECIO').val(),
    EDITORIAL: $('#EDITORIAL').val(),
    };
    var datoslibrojson = JSON.stringify(datoslibro);

    $.ajax({
        url: UrlInsertLibro,
        type: 'POST',
        data: datoslibrojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Libro agregado Correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar Libro'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarLibro(codigolibro){
    var datoslibro = {
        CODIGO_DE_LIBRO: codigolibro
    };
    var datoslibrojson = JSON.stringify(datoslibro);

    $.ajax({
        url: UrlGetLibro,
        type: 'POST',
        data: datoslibrojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            var MiItems = reponse;
            $('#CODIGO_DE_LIBRO').val(MiItems[0].CODIGO_DE_LIBRO);
            $('#NOMBRE_LIBRO').val(MiItems[0].NOMBRE_LIBRO);
            $('#NOMBRE_ESCRITOR').val(MiItems[0].NOMBRE_ESCRITOR);
            $('#FECHA_PUBLICACION').val(MiItems[0].FECHA_PUBLICACION);
            $('#ISBN').val(MiItems[0].ISBN);
            $('#PRECIO').val(MiItems[0].PRECIO);
            $('#EDITORIAL').val(MiItems[0].EDITORIAL);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarLibro(' + MiItems[0].CODIGO_DE_LIBRO + ')"'+
            'value="Actualizar Libro" class="btn btn-primary"></input>';
            $('#btnagregarlibro').html(btnactualizar);
        }
    });
}

function ActualizarLibro(codigolibro){
    var datoslibro = {
        CODIGO_DE_LIBRO: codigolibro,
        NOMBRE_LIBRO:$('#NOMBRE_LIBRO').val(),
        NOMBRE_ESCRITOR:$('#NOMBRE_ESCRITOR').val(),
        FECHA_PUBLICACION:$('#FECHA_PUBLICACION').val(),
        ISBN:$('#ISBN').val(),
        PRECIO:$('#PRECIO').val(),
        EDITORIAL:$('#EDITORIAL').val(),
    };
    var datoslibrojson = JSON.stringify(datoslibro);

    $.ajax({
        url: UrlUpdateLibro,
        type: 'PUT',
        data: datoslibrojson,
        datatype: 'JSON',
        contenType: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Libro actualizado con éxito');
        },
        error: function(textStatus, errorThrown){
            alert('Error al actualizar el libro' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}
function EliminarLibro(codigolibro){
    var datoslibro ={
        CODIGO_DE_LIBRO:codigolibro
    };
    var datoslibrojson = JSON.stringify(datoslibro);

    $.ajax({
        url: UrlDeleteLibro,
        type: 'DELETE',
        data: datoslibrojson,
        datype: 'JSON',
        contenType: 'application/json',
        success: function (reponse){
            console.log(reponse);
        },
        error: function(textStatus, errorThrown){
            alert('Error al eliminar Libro' + textStatus + errorThrown);
        }        
    });
    alert("Libro eliminado con éxito");
    CargarLibros();
}
