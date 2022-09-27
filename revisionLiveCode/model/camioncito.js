class Camioncito extends Camion {
    constructor() {
        super(0.3, 6000);
    }

    comenzarViaje(viaje) {
        this.validarViaje(viaje)
        this.viaje = viaje;
        actualizarCarga(viaje);
    }

    validarViaje(viaje){
        if(this.carga < viaje.cargaATransportar()) {
            throw new Error("No se puede empezar tu viaje padre!");

        }
    }
    
    actualizarCarga(viaje) {
        this.carga += viaje.cargaPedida
    }

    finalizarViaje() {
        this.carga -= this.viaje.carga;
        this.viaje = undefined;
    }

    tiempoParaViaje(kmBuenEstado, kmMalEstado, carga) {
        let n;
        let tiempoFijo = 0.15;
        if (carga <= 3000) {
            n = 75;
        } else if (carga > 3000 && carga <= 5000) {
            n = 70;
        } else if (carga > 5000) {
            n = 60;
        }
        let tiempoParaViaje = tiempoFijo + kmBuenEstado / 100 + kmMalEstado / n;
        return tiempoParaViaje;
    } 

    consumoParticular(kmBuenEstado, kmMalEstado, consumoPorCarga) {
        return 1 * kmBuenEstado * consumoPorCarga + 1.5 * kmMalEstado * consumoPorCarga;
    }
}

module.exports = Camioncito;