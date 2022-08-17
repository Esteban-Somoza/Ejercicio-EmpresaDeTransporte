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
    viajeAsignado: null
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
    viajeAsignado: null
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
    viajeAsignado: null
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
    viajeAsignado: null
}

// bases de datos

let baseDeDatosVehiculos = [camioneta, combi, camioncito, camionazo]
let baseDeDatosLugares = ["lugarA", "lugarB", "lugarC", "lugarD"]


// operaciones

let operaciones = {
    vehiculosDisponibles: baseDeDatosVehiculos,

    ruta: function (lugarA, lugarB) {
        let lugares = baseDeDatosLugares
        // iria una especie de grafo con nodos
        return { kmBuenEstado: 150, kmMalEstado: 2000 }
    },

    vehiculosConCapacidadDeViaje: function (trayecto, carga, tiempoMaximo) {
        let ruta = this.ruta(trayecto.puntoA, trayecto.puntoB)
        this.vehiculosDisponibles = this.vehiculosDisponibles.filter(v => v.cargaMaxima >= carga)
        this.vehiculosDisponibles = this.vehiculosDisponibles.filter(v => v.tiempoParaViaje(ruta.kmBuenEstado, ruta.kmMalEstado, carga) <= tiempoMaximo)

        return this.vehiculosDisponibles
    },


    asignarViaje: function (vehiculo, viaje) {
        let vehiculoAAsignar = this.vehiculosDisponibles.find(v => v.tipo === vehiculo)
        if (!vehiculoAAsignar) return console.log("No hay vehicuos disponibles")
        return vehiculoAAsignar.viajeAsignado = viaje
    },

    calcularConsumo: function (vehiculo) {
        let vehiculoACalcular = this.vehiculosDisponibles.find(v => v.tipo === vehiculo)
        if (!vehiculoACalcular.viajeAsignado) return console.log("no habia viaje")
        let ruta = this.ruta(vehiculoACalcular.puntoA, vehiculoACalcular.puntoB)
        return vehiculoACalcular.consumoCombustible(ruta.kmBuenEstado, ruta.kmMalEstado, vehiculoACalcular.viajeAsignado.carga)
    },

    calcularConsumoTotal: function () {
        let consumoTotal = 0
        this.vehiculosDisponibles.forEach(v => {
            if (v.viajeAsignado) {
                consumoTotal += this.calcularConsumo(v.tipo)
            }
        })
        return consumoTotal
    }
}


// console.log(operaciones.vehiculosDisponibles)
// operaciones.vehiculosConCapacidadDeViaje({ puntoA: "lugarA", puntoB: "lugarB" }, 2000, 18)
// console.log(operaciones.vehiculosDisponibles)
// operaciones.asignarViaje("camionazo", { puntoA: "lugarA", puntoB: "lugarB", carga: 2000 })
// operaciones.asignarViaje("combi", { puntoA: "lugarA", puntoB: "lugarB", carga: 2000 })
// console.log(operaciones.calcularConsumo("camionazo"))
// console.log(operaciones.calcularConsumoTotal())
