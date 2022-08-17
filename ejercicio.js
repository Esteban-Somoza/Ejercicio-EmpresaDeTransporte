// requires
let Moment = require('moment')
let MomentRange = require('moment-range')
const moment = MomentRange.extendMoment(Moment);

// Definicion de vehiculos

let camioneta = {
    tipo: "camioneta",
    cargaMaxima: 1200,
    tiempoParaViaje: function (kmBuenEstado, kmMalEstado) {
        let tiempoParaViaje = kmBuenEstado / 120 + kmMalEstado / 100
        return tiempoParaViaje
    },
    consumoCombustible: function (kmBuenEstado, kmMalEstado) {
        let kilometrajeTotal = kmBuenEstado + kmMalEstado
        let consumoCombustible = kilometrajeTotal * 0.1
        return consumoCombustible
    },
    viajeAsignado: null,
    mantenimiento: []
}

let combi = {
    tipo: "combi",
    cargaMaxima: 2500,
    tiempoParaViaje: function (kmBuenEstado, kmMalEstado, carga) {
        let kilometrajeTotal = kmBuenEstado + kmMalEstado
        let limitePeso = 1800
        let tiempo
        if (carga <= limitePeso) {
            tiempo = 100
        }
        if (carga > limitePeso) {
            tiempo = 90
        }

        let tiempoParaViaje = kilometrajeTotal / tiempo
        return tiempoParaViaje
    },
    consumoCombustible: function (kmBuenEstado, kmMalEstado, carga) {
        let kilometrajeTotal = kmBuenEstado + kmMalEstado
        let limitePeso = 1500
        let consumo

        if (carga <= limitePeso) {
            consumo = 0.15
        }
        if (carga > limitePeso) {
            consumo = 0.2
        }
        let consumoCombustible = kilometrajeTotal * consumo
        return consumoCombustible
    },
    viajeAsignado: null,
    mantenimiento: []
}

let camioncito = {
    tipo: "camioncito",
    cargaMaxima: 6000,
    tiempoParaViaje: function (kmBuenEstado, kmMalEstado, carga) {
        let n
        let tiempoFijo = 0.15
        if (carga <= 3000) {
            n = 75
        }
        else if (carga > 3000 && carga <= 5000) {
            n = 70
        }
        else if (carga > 5000) {
            n = 60
        }
        let tiempoParaViaje = tiempoFijo + kmBuenEstado / 100 + kmMalEstado / n
        return tiempoParaViaje
    },
    consumoCombustible: function (kmBuenEstado, kmMalEstado, carga) {
        let consumoPorCarga = carga / 1500
        let consumoCombustible = 1 * kmBuenEstado * consumoPorCarga + 1.5 * kmMalEstado * consumoPorCarga
        return consumoCombustible
    },
    viajeAsignado: null,
    mantenimiento: []
}

let camionazo = {
    tipo: "camionazo",
    cargaMaxima: 20000,
    tiempoParaViaje: function (kmBuenEstado, kmMalEstado, carga) {
        let coeficienteCarga
        let tiempoFijo = 1
        if (carga <= 10000) {
            coeficienteCarga = 1
        }
        else if (carga > 10000) {
            coeficienteCarga = 1.3
        }
        let tiempoParaViaje = tiempoFijo + kmBuenEstado / 90 + kmMalEstado / 70 * coeficienteCarga
        return tiempoParaViaje
    },
    consumoCombustible: function (kmBuenEstado, kmMalEstado, carga) {
        let kilometrajeTotal = kmBuenEstado + kmMalEstado
        let consumoPorCarga = carga / 1000
        let consumoCombustible = 1 * kilometrajeTotal * consumoPorCarga + 0.3 * kilometrajeTotal
        return consumoCombustible
    },
    viajeAsignado: null,
    mantenimiento: []
}

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
        return { kmBuenEstado: 150, kmMalEstado: 500 }
    },

    vehiculosConCapacidadDeViaje: function (trayecto, carga, duracionMaximaViaje) {
        let ruta = this.ruta(trayecto.puntoA, trayecto.puntoB)
        let comienzoViaje = new Date()
        let finalizacionViaje = new Date(comienzoViaje.getTime() + duracionMaximaViaje * 60 * 60 * 1000);
        this.vehiculosDisponibles = this.vehiculosDisponibles.filter(v => v.cargaMaxima >= carga)
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
        let mantenimiento = { entrada: entrada, salida: salida }
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
            }
            else {
                // console.log("ok");
                return true
            }
        }
    }

}


// operaciones.asignarViaje("camionazo", { puntoA: "lugarA", puntoB: "lugarB", carga: 2000 })
operaciones.asignarViaje("combi", { puntoA: "lugarA", puntoB: "lugarB", carga: 2000 })
operaciones.desasignarViaje("combi", { puntoA: "lugarA", puntoB: "lugarB", carga: 2000 })
// console.log(operaciones.calcularConsumo("camionazo"))
// console.log(operaciones.calcularConsumoTotal())
// let salida = new Date(entrada + "40:00:00")
// console.log(salida);
// console.log(operaciones.asignarMantenimiento("combi", entrada2, 70))
// console.log(operaciones.seleccionarVehiculo("combi"))
// operaciones.vehiculosConCapacidadDeViaje({ puntoA: "lugarA", puntoB: "lugarB" }, 600, 12)
// console.log(operaciones.vehiculosConCapacidadDeViaje.forEach(date => !(date.fechaEntrada <= finalizacionViaje) && (comienzoViaje <= date.fechaSalida)))
// operaciones.asignarMantenimiento("combi", entrada, 30)
// operaciones.asignarMantenimiento("combi", entrada2, 30)
// let entrada = new Date("August 19, 2022 08:30:00 UTC")
// let entrada2 = new Date("August 22, 2022 08:30:00 UTC")
console.log(operaciones.seleccionarVehiculo("combi"))


