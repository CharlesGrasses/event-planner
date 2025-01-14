namespace APIrequests {
    // Mocking variables
    const venues = [
        "Plaza de armas",
        "Teatro Municipal",
        "Parque Forestal",
        "Centro Cultural GAM",
        "Club Chocolate",
        "Bar La Obra",
        "Estadio Nacional",
        "Blondie",
        "La Cúpula",
        "Centro de Eventos Chimkowe"
    ];
    const bands = [
        "Oscilan",
        "Phuyu y la fantasma",
        "Asia Menor",
        "Chini.png",
        "Estoy bien",
        "Sinópticos",
        "Monos Chinos",
        "Monos Chinos Submarinos",
        "Niños del Cerro",
        "Javiera Electra",
        "Los Pulentos",
        "Mist",
        "Weezer",
        "Gepe",
        "Alex Andwanter",
        "El mató a un policía motorizado",
        "Negra Ácida",
        "Dënver",
        "Pau",
        "Brígida Orquesta",
        "Dolorio y los tunantes"
    ];
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In hendrerit auctor odio, sit amet gravida est tincidunt iaculis. Quisque luctus porta dolor, vitae vestibulum leo luctus ac. Suspendisse interdum ante a sapien dapibus, nec porttitor nunc eleifend. Curabitur dignissim, quam vitae tempus molestie, enim arcu feugiat mauris, et tempor neque massa semper sem.";

    // CAMBIAR CUANDO SE HAYA CREADO LA API
    export async function getGatheringsForDate (date: Date) {
        const hour = Math.random() * 12;
        return bands.slice(0, Math.floor(Math.random() * bands.length)).map((band, index) => ({
            id: `${index + 1}`,
            title: `${band} en concierto`,
            time: `${hour}:00 - ${hour + 2}:00`,
            location: venues[index % venues.length],
            capacity: 200 + Math.floor(Math.random() * 2000),
            description: description
        }));
    }

    export async function getGatheringsForTimeSlot (date: Date, hour: number) {
        if(Math.random() > 0.3) return [];

        return bands.slice(0, Math.floor(Math.random() * bands.length)).map((band, index) => ({
            id: `${date.toISOString}-${hour}-${index}`,
            title: `${band} en concierto`,
            time: `${hour}:00 - ${hour + 2}:00`,
            location: venues[index % venues.length],
            capacity: 200 + Math.floor(Math.random() * 2000),
            description: description
        }));
    }
}

export default APIrequests;