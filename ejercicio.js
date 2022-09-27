// requires
let Moment = require('moment')
let MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment);



// bases de datos

let baseDeDatosVehiculos = [camioneta, combi, camioncito, camionazo]
let baseDeDatosLugares = ["lugarA", "lugarB", "lugarC", "lugarD"]


// operaciones

let operaciones = {
    vehiculosDisponibles: baseDeDatosVehiculos,

    seleccionarVehiculo: function (vehiculo) {
        return this.vehiculosDisponibles.find(v => v.tipo === vehiculo)
    },

    ruta: function (lugarA, lugarB) {
        let lugares = baseDeDatosLugares
        // iria una especie de grafo con nodos
        return {
            kmBuenEstado: 150,
            kmMalEstado: 500
        }
    },

    vehiculosConCapacidadDeViaje: function (trayecto, carga, duracionMaximaViaje) {
        let ruta = this.ruta(trayecto.puntoA, trayecto.puntoB)
        let comienzoViaje = new Date()
        let finalizacionViaje = new Date(comienzoViaje.getTime() + duracionMaximaViaje * 60 * 60 * 1000);
        this.vehiculosDisponibles = this.vehiculosDisponibles.filter(v => v.estasDisponible())
        this.vehiculosDisponibles = this.vehiculosDisponibles.filter(v => v.tiempoParaViaje(ruta.kmBuenEstado, ruta.kmMalEstado, carga) <= duracionMaximaViaje)
        this.vehiculosDisponibles = this.vehiculosDisponibles.filter(v => this.consultaMantenimiento(v.tipo, comienzoViaje, finalizacionViaje))
        return this.vehiculosDisponibles
    },

    asignarViaje: function (vehiculo, viaje) {
        // let vehiculoAAsignar = this.vehiculosDisponibles.find(v => v.tipo === vehiculo)
        let vehiculoSeleccionado = this.seleccionarVehiculo(vehiculo)
        if (!vehiculoSeleccionado) return console.log("No hay vehicuos disponibles")
        return vehiculoSeleccionado.viajeAsignado = viaje
    },

    desasignarViaje: function (vehiculo, viaje) {
        // let vehiculoAAsignar = this.vehiculosDisponibles.find(v => v.tipo === vehiculo)
        let vehiculoSeleccionado = this.seleccionarVehiculo(vehiculo)
        // let quitarViaje = vehiculoSeleccionado.viajeAsignado.filter(v => v != viaje)
        return vehiculoSeleccionado.viajeAsignado = {}
    },

    calcularConsumo: function (vehiculo) {
        // let vehiculoACalcular = this.vehiculosDisponibles.find(v => v.tipo === vehiculo)
        let vehiculoSeleccionado = this.seleccionarVehiculo(vehiculo)
        if (!vehiculoSeleccionado.viajeAsignado) return console.log("no habia viaje")
        let ruta = this.ruta(vehiculoSeleccionado.puntoA, vehiculoSeleccionado.puntoB)
        return vehiculoSeleccionado.consumoCombustible(ruta.kmBuenEstado, ruta.kmMalEstado, vehiculoSeleccionado.viajeAsignado.carga)
    },

    calcularConsumoTotal: function () {
        let consumoTotal = 0
        this.vehiculosDisponibles.forEach(v => {
            if (v.viajeAsignado) {
                consumoTotal += this.calcularConsumo(v.tipo)
            }
        })
        return consumoTotal
    },

    asignarMantenimiento: function (vehiculo, entrada, duracion) {
        let vehiculoSeleccionado = this.seleccionarVehiculo(vehiculo)
        let salida = new Date(entrada.getTime() + duracion * 60 * 60 * 1000);
        let mantenimiento = {
            entrada: entrada,
            salida: salida
        }
        // console.log(entrada);
        // console.log(salida);
        if (this.consultaMantenimiento(vehiculoSeleccionado.tipo, entrada, salida) == false) {
            return console.log("Fecha mantenimiento solapada");
        }
        return vehiculoSeleccionado.mantenimiento.push(mantenimiento)
    },

    consultaMantenimiento: function (vehiculo, fechaEntrada, fechaSalida) {
        let fechasMantenimiento = this.seleccionarVehiculo(vehiculo).mantenimiento
        let rangoActual = moment.range(fechaEntrada, fechaSalida)
        if (fechasMantenimiento.length === 0) {
            return true
        }
        for (let i = 0; i < fechasMantenimiento.length; i++) {
            let rangoMantenimiento = moment.range(fechasMantenimiento[i].entrada, fechasMantenimiento[i].salida)
            if (rangoMantenimiento.overlaps(rangoActual)) {
                return false
            } else {
                // console.log("ok");
                return true
            }
        }
    }

}

console.log(operaciones.vehiculosConCapacidadDeViaje({
    puntoA: "lugarA",
    puntoB: "lugarB"
}, 1300, 12))

// console.log(operaciones.vehiculosConCapacidadDeViaje());
// operaciones.asignarViaje("camionazo", { puntoA: "lugarA", puntoB: "lugarB", carga: 2000 })
// operaciones.asignarViaje("combi", { puntoA: "lugarA", puntoB: "lugarB", carga: 2000 })
// operaciones.desasignarViaje("combi", { puntoA: "lugarA", puntoB: "lugarB", carga: 2000 })
// console.log(operaciones.calcularConsumo("camionazo"))
// console.log(operaciones.calcularConsumoTotal())
// let salida = new Date(entrada + "40:00:00")
// console.log(salida);
// console.log(operaciones.asignarMantenimiento("combi", entrada2, 70))
// console.log(operaciones.seleccionarVehiculo("combi"))
// console.log(operaciones.vehiculosConCapacidadDeViaje.forEach(date => !(date.fechaEntrada <= finalizacionViaje) && (comienzoViaje <= date.fechaSalida)))
// operaciones.asignarMantenimiento("combi", entrada, 30)
// operaciones.asignarMantenimiento("combi", entrada2, 30)
// let entrada = new Date("August 19, 2022 08:30:00 UTC")
// let entrada2 = new Date("August 22, 2022 08:30:00 UTC")
// console.log(operaciones.seleccionarVehiculo("combi"))