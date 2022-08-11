var UrlEscritores = 'http://20.216.41.245:90/G3_19/controller/escritor.php?opc=GetEscritores';
var UrlInsertEscritor = 'http://20.216.41.245:90/G3_19/controller/escritor.php?opc=InsertEscritor';
var UrlGetEscritor = 'http://20.216.41.245:90/G3_19/controller/escritor.php?opc=GetEscritor';
var UrlUpdateEscritor = 'http://20.216.41.245:90/G3_19/controller/escritor.php?opc=UpdateEscritor';
var UrlDeleteEscritor = 'http://20.216.41.245:90/G3_19/controller/escritor.php?opc=DeleteEscritor';

$(document).ready(function(){
    CargarEscritores();
});

function CargarEscritores(){
    $.ajax({
        url: UrlEscritores,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores= '';

            for(i=0; i<MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].NUMERO_ESCRITOR +'</td>'+
                '<td>'+ MiItems[i].NOMBRE_ESCRITOR +'</td>'+
                '<td>'+ MiItems[i].APELLIDOS_ESCRITOR +'</td>'+
                '<td>'+ MiItems[i].FECHA_DE_NACIMIENTO +'</td>'+
                '<td>'+ MiItems[i].NACIONALIDAD +'</td>'+
                '<td>'+ MiItems[i].CANTIDAD_LIBROS_ESCRITOS +'</td>'+
                '<td>'+ MiItems[i].EMAIL +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarEscritor('+ MiItems[i].NUMERO_ESCRITOR +')">Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarEscritor('+ MiItems[i].NUMERO_ESCRITOR +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('#DataEscritores').html(Valores);
            }
        }
    });
}

function AgregarEscritor(){
    var datosescritor = {
        NUMERO_ESCRITOR: $('#NUMERO_ESCRITOR').val(),
        NOMBRE_ESCRITOR: $('#NOMBRE_ESCRITOR').val(),
        APELLIDOS_ESCRITOR: $('#APELLIDOS_ESCRITOR').val(),
        FECHA_DE_NACIMIENTO: $('#FECHA_DE_NACIMIENTO').val(),
        NACIONALIDAD: $('#NACIONALIDAD').val(),
        CANTIDAD_LIBROS_ESCRITOS: $('#CANTIDAD_LIBROS_ESCRITOS').val(),
        EMAIL: $('#EMAIL').val()
    };
    var datosescritorjson = JSON.stringify(datosescritor);

    $.ajax({
        url: UrlInsertEscritor,
        type: 'POST',
        data: datosescritorjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Escritor agregado correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar escritor'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarEscritor(numeroescritor){
    var datosescritor = {
        NUMERO_ESCRITOR: numeroescritor
    };
    var datosescritorjson = JSON.stringify(datosescritor);

    $.ajax({
        url: UrlGetEscritor,
        type: 'POST',
        data: datosescritorjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            var MiItems = reponse;
            $('#NUMERO_ESCRITOR').val(MiItems[0].NUMERO_ESCRITOR);
            $('#NOMBRE_ESCRITOR').val(MiItems[0].NOMBRE_ESCRITOR);
            $('#APELLIDOS_ESCRITOR').val(MiItems[0].APELLIDOS_ESCRITOR);
            $('#FECHA_DE_NACIMIENTO').val(MiItems[0].FECHA_DE_NACIMIENTO);
            $('#NACIONALIDAD').val(MiItems[0].NACIONALIDAD);
            $('#CANTIDAD_LIBROS_ESCRITOS').val(MiItems[0].CANTIDAD_LIBROS_ESCRITOS);
            $('#EMAIL').val(MiItems[0].EMAIL);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarEscritor(' + MiItems[0].NUMERO_ESCRITOR + ')"'+
            'value="Actualizar Escritor" class="btn btn-primary"></input>';
            $('#btnagregarescritor').html(btnactualizar);
        }
    });
}

function ActualizarEscritor(numeroescritor){
    var datosescritor = {
        NUMERO_ESCRITOR: numeroescritor,
        NOMBRE_ESCRITOR:$('#NOMBRE_ESCRITOR').val(),
        APELLIDOS_ESCRITOR:$('#APELLIDOS_ESCRITOR').val(),
        FECHA_DE_NACIMIENTO:$('#FECHA_DE_NACIMIENTO').val(),
        NACIONALIDAD:$('#NACIONALIDAD').val(),
        CANTIDAD_LIBROS_ESCRITOS:$('#CANTIDAD_LIBROS_ESCRITOS').val(),
        EMAIL:$('#EMAIL').val()
    };
    var datosescritorjson = JSON.stringify(datosescritor);

    $.ajax({
        url: UrlUpdateEscritor,
        type: 'PUT',
        data: datosescritorjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            console.log(reponse);
            alert("Escritor actualizado con éxito");
        },
        error: function(textStatus, errorThrown){
            alert('Error al actualizar escritor' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarEscritor(numeroescritor){
    var datosescritor = {
        NUMERO_ESCRITOR: numeroescritor
    };
    var datosescritorjson = JSON.stringify(datosescritor);

    $.ajax({
        url: UrlDeleteEscritor,
        type: 'DELETE',
        data: datosescritorjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (reponse){
            console.log(reponse);
            alert("Escritor eliminado correctamente");
        },
        error: function(textStatus, errorThrown){
            alert('Error al eliminar escritor' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
    CargarEscritores();
}
