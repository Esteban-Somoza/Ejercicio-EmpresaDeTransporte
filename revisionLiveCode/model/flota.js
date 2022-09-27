class Flota {
    constructor(vehiculos) {
        this.vehiculos = vehiculos;
    }

    vehiculosDisponiblesPara(viaje) {
        return this.vehiculos.filter(v => v.estaDisponible());
    }
}

module.exports = Flota