

export const AppointState = () => {
    const res = new Map<number, string>();

    res.set(1, "Enviado");
    res.set(2, "Cancelado");
    res.set(3, "Confirmado");
    res.set(4, "Perdido");

    return res;
}

export const AppointStateArray = () =>
    [
        {
            text: 'Enviado',
            value: 1
        },
        {
            text: 'Cancelado',
            value: 2
        },
        {
            text: 'Confirmado',
            value: 3
        },
        {
            text: 'Perdido',
            value: 4
        }
    ]