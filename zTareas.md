### Pendientes

#   Backend
1. Crear tabla para estados de viajes

    {
        id:"xxx1",
        idConductor: "c01",
        idPasajeto: "p01",
        status: 1
    }

    estados:
    0 cancelado
    1 por confirmar
    2 en espera
    3 en curso
    4 completado

2. Crear api para estados de viajes

    endpoint:
    1 postViaje
    2 getViaje
    3 putViaje


#   Pasajero
1. Revisar endpoints de AWS (Get, Post y Put)
2. Guardar datos del usuario en LocalStorage
3. Validar datos de Home(Nombre y mapa), Perfil e Historial con LocalStorage
4. Crear viaje
    4.1 Post viaje
5. Vista estado del viaje (Solo se puede salir al cancelar o terminar el viaje)

#   Conductor
1. Crear Home con Viajes disponibles
2. Tomar viaje
3. Cambiar estados de viaje

