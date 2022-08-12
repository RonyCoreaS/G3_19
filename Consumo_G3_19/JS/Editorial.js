var UrlEditoriales ='http://20.216.41.245:90/G3_19/controller/editorial.php?opc=GetEditoriales';
var UrlInsertEditorial ='http://20.216.41.245:90/G3_19/controller/editorial.php?opc=InsertEditorial';
var UrlGetEditorial ='http://20.216.41.245:90/G3_19/controller/editorial.php?opc=GetEditorial';
var UrlUpdateEditorial ='http://20.216.41.245:90/G3_19/controller/editorial.php?opc=UpdateEditorial';
var UrlDeleteEditorial ='http://20.216.41.245:90/G3_19/controller/editorial.php?opc=DeleteEditorial';

$(document).ready(function(){
    CargarEditoriales();
});

function CargarEditoriales(){
    $.ajax({
        url: UrlEditoriales,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores= '';

            for(i=0; i<MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].NUMERO_EDITORIAL +'</td>'+
                '<td>'+ MiItems[i].NOMBRE_EDITORIAL +'</td>'+
                '<td>'+ MiItems[i].DIRECCION +'</td>'+
                '<td>'+ MiItems[i].PAIS +'</td>'+
                '<td>'+ MiItems[i].FECHA_FUNDACION +'</td>'+
                '<td>'+ MiItems[i].CANTIDAD_LIBROS_IMPRESOS +'</td>'+
                '<td>'+ MiItems[i].NUMERO_TELEFONO +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarEditorial('+ MiItems[i].NUMERO_EDITORIAL +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarEditorial('+ MiItems[i].NUMERO_EDITORIAL +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('#DataEditoriales').html(Valores);
            }
        }
    });
}

function AgregarEditorial(){
    var datoseditorial = {
        NUMERO_EDITORIAL: $('#NUMERO_EDITORIAL').val(),
        NOMBRE_EDITORIAL: $('#NOMBRE_EDITORIAL').val(),
        DIRECCION: $('#DIRECCION').val(),
        PAIS: $('#PAIS').val(),
        FECHA_FUNDACION: $('#FECHA_FUNDACION').val(),
        CANTIDAD_LIBROS_IMPRESOS: $('#CANTIDAD_LIBROS_IMPRESOS').val(),
        NUMERO_TELEFONO: $('#NUMERO_TELEFONO').val()
    };
    var datoseditorialjson = JSON.stringify(datoseditorial);

    $.ajax({
        url: UrlInsertEditorial,
        type: 'POST',
        data: datoseditorialjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Editorial agregada correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar editorial'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarEditorial(numeroeditorial){
    var datoseditorial = {
        NUMERO_EDITORIAL: numeroeditorial
    };
    var datoseditorialjson = JSON.stringify(datoseditorial);

    $.ajax({
        url: UrlGetEditorial,
        type: 'POST',
        data: datoseditorialjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            var MiItems = reponse;
            $('#NUMERO_EDITORIAL').val(MiItems[0].NUMERO_EDITORIAL);
            $('#NOMBRE_EDITORIAL').val(MiItems[0].NOMBRE_EDITORIAL);
            $('#DIRECCION').val(MiItems[0].DIRECCION);
            $('#PAIS').val(MiItems[0].PAIS);
            $('#FECHA_FUNDACION').val(MiItems[0].FECHA_FUNDACION);
            $('#CANTIDAD_LIBROS_IMPRESOS').val(MiItems[0].CANTIDAD_LIBROS_IMPRESOS);
            $('#NUMERO_TELEFONO').val(MiItems[0].NUMERO_TELEFONO);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarEditorial(' + MiItems[0].NUMERO_EDITORIAL + ')"'+
            'value="Actualizar Editorial" class="btn btn-primary"></input>';
            $('#btnagregareditorial').html(btnactualizar);
        }
    });
}

function ActualizarEditorial(numeroeditorial){
    var datoseditorial = {
        NUMERO_EDITORIAL: numeroeditorial,
        NOMBRE_EDITORIAL: $('#NOMBRE_EDITORIAL').val(),
        DIRECCION: $('#DIRECCION').val(),
        PAIS: $('#PAIS').val(),
        FECHA_FUNDACION: $('#FECHA_FUNDACION').val(),
        CANTIDAD_LIBROS_IMPRESOS: $('#CANTIDAD_LIBROS_IMPRESOS').val(),
        NUMERO_TELEFONO: $('#NUMERO_TELEFONO').val()
    };
    var datoseditorialjson = JSON.stringify(datoseditorial);

    $.ajax({
        url: UrlUpdateEditorial,
        type: 'PUT', 
        data: datoseditorialjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            console.log(reponse);
            alert("Editorial actualizado con éxito");
        },
        error: function(textStatus, errorThrown){
            alert('Error al actualizar editorial' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarEditorial(numeroeditorial){
    var datoseditorial = {
        NUMERO_EDITORIAL: numeroeditorial
    };
    var datoseditorialjson = JSON.stringify(datoseditorial);

    $.ajax({
        url: UrlDeleteEditorial,
        type: 'DELETE',
        data: datoseditorialjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            console.log(reponse);
            alert("Editorial eliminado con éxito");
        },
        error: function(textStatus, errorThrown){
            alert('Error al eliminar editorial' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
    CargarEditoriales();
}