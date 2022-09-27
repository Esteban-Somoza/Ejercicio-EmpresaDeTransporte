suite('Flota de vehiculos', () => {
    it('trae uno solo de los vehiculos y es un camion', () => {
      let viaje = new Viaje("a", "b", 5000);
      let camioncito = new Camioncito();
      let combi = new Combi();
      let flota = new Flota([camioncito, combi]);
      flota.agregarVehiculo(new Combi())
      let vehiculosDisponibles = flota.vehiculosDisponiblesPara(viaje);
      expect(vehiculosDisponibles.lenght).to.be(1);
      expect(vehiculosDisponibles[0]).to.be(camioncito);
    });

    it('no trae ninguno', () => {
        let viaje = new Viaje("a", "b", 50000);
        let camioncito = new Camioncito();
        let combi = new Combi();
        let flota = new Flota([camioncito, combi]);
        let vehiculosDisponibles = flota.vehiculosDisponiblesPara(viaje);
        expect(vehiculosDisponibles.lenght).to.be(0);
      })
});