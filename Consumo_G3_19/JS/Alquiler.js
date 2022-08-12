var UrlAlquileres     = 'http://20.216.41.245:90/G3_19/controller/alquiler.php?opc=GetAlquileres';
var UrlInsertAlquiler = 'http://20.216.41.245:90/G3_19/controller/alquiler.php?opc=InsertAlquiler';
var UrlGetAlquiler    = 'http://20.216.41.245:90/G3_19/controller/alquiler.php?opc=GetAlquiler';
var UrlUpdateAlquiler = 'http://20.216.41.245:90/G3_19/controller/alquiler.php?opc=UpdateAlquiler';
var UrlDeleteAlquiler = 'http://20.216.41.245:90/G3_19/controller/alquiler.php?opc=DeleteAlquiler';
$(document).ready(function(){
   CargarAlquileres();
});

function CargarAlquileres(){
    
    $.ajax({
        url : UrlAlquileres,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MisItems = reponse;
            var Valores='';
            
            for(i=0; i<MisItems.length; i++){
                Valores+= '<tr>'+
                '<td>'+ MisItems[i].CODIGO_DE_LIBRO +'</td>'+
                '<td>'+ MisItems[i].NOMBRE_LIBRO +'</td>'+
                '<td>'+ MisItems[i].FECHA_DE_ALQUILER +'</td>'+
                '<td>'+ MisItems[i].NOMBRE_DEL_CLIENTE +'</td>'+
                '<td>'+ MisItems[i].DIRECCION +'</td>'+
                '<td>'+ MisItems[i].DIAS_A_ALQUILAR +'</td>'+
                '<td>'+ MisItems[i].PRECIO_POR_ALQUILER+'</td>'+
                '<td>'+ 
                '<button class="btn btn-info" onclick="CargarAlquiler('+MisItems[i].CODIGO_DE_LIBRO +')">Editar</button>'+
                '</td>'+
                '<td>'+ 
                '<button class="btn btn-danger" onclick="EliminarAlquiler('+MisItems[i].CODIGO_DE_LIBRO +')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('#DataAlquileres').html(Valores);
            }
        }

    });
}

function AgregarAlquiler(){
    var datosAlquiler = {
    CODIGO_DE_LIBRO: $('#CODIGO_DE_LIBRO').val(),
    NOMBRE_LIBRO: $('#NOMBRE_LIBRO').val(),
    FECHA_DE_ALQUILER: $('#FECHA_DE_ALQUILER').val(),
    NOMBRE_DEL_CLIENTE: $('#NOMBRE_DEL_CLIENTE').val(),
    DIRECCION: $('#DIRECCION').val(),
    DIAS_A_ALQUILAR: $('#DIAS_A_ALQUILAR').val(),
    PRECIO_POR_ALQUILER: $('#PRECIO_POR_ALQUILER').val()
    };
    var datosAlquileresJson= JSON.stringify(datosAlquiler);

    $.ajax({
        url:UrlInsertAlquiler,
        type: 'POST',
        data: datosAlquileresJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Alquiler Agregado');
        },

        error: function(textStatus, errorThrown){
            alert('Error al agregar alquiler' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function CargarAlquiler(idAlquiler){
    var datosAlquiler = {
        CODIGO_DE_LIBRO:idAlquiler
    };
    var datosAlquilerJson=JSON.stringify(datosAlquiler);

    $.ajax({
        url: UrlGetAlquiler,
        type: 'POST',
        data: datosAlquilerJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            var MisItems = reponse;
            $('#CODIGO_DE_LIBRO').val(MisItems[0].CODIGO_DE_LIBRO);
            $('#NOMBRE_LIBRO').val(MisItems[0].NOMBRE_LIBRO);
            $('#FECHA_DE_ALQUILER').val(MisItems[0].FECHA_DE_ALQUILER);
            $('#NOMBRE_DEL_CLIENTE').val(MisItems[0].NOMBRE_DEL_CLIENTE);
            $('#DIRECCION').val(MisItems[0].DIRECCION);
            $('#DIAS_A_ALQUILAR').val(MisItems[0].DIAS_A_ALQUILAR);
            $('#PRECIO_POR_ALQUILER').val(MisItems[0].PRECIO_POR_ALQUILER);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarArquiler(' +MisItems[0].CODIGO_DE_LIBRO+')"'+
            'value="Actualizar Alquiler" class="btn btn-primary"></input>';
            $('#btnagregarAlquiler').html(btnactualizar);
        }
    });
}

function ActualizarArquiler(idAlquiler){
    var datosAlquiler={
    CODIGO_DE_LIBRO: idAlquiler,
    NOMBRE_LIBRO: $('#NOMBRE_LIBRO').val(),
    FECHA_DE_ALQUILER: $('#FECHA_DE_ALQUILER').val(),
    NOMBRE_DEL_CLIENTE: $('#NOMBRE_DEL_CLIENTE').val(),
    DIRECCION: $('#DIRECCION').val(),
    DIAS_A_ALQUILAR: $('#DIAS_A_ALQUILAR').val(),
    PRECIO_POR_ALQUILER: $('#PRECIO_POR_ALQUILER').val()
    };
    var datosAlquilerJson = JSON.stringify(datosAlquiler);

    $.ajax({
        url: UrlUpdateAlquiler,
        type: 'PUT',
        data: datosAlquilerJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Alquiler Actualizado');
        },

        error: function(textStatus, errorThrown){
            alert('Error al actualizar alquiler' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
}

function EliminarAlquiler(idAlquiler){
    var datosAlquiler={
        CODIGO_DE_LIBRO:idAlquiler
    };

    var datosAlquilerJson= JSON.stringify(datosAlquiler);

    $.ajax({
        url: UrlDeleteAlquiler,
        type: 'DELETE',
        data: datosAlquilerJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Alquiler Eliminado');
        },

        error: function(textStatus, errorThrown){
            alert('Error al eliminar alquiler' + textStatus + errorThrown);
        }
    });
    alert('Aviso');
    CargarAlquileres();
}