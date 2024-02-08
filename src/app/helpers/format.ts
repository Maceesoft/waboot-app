

export const FormatHelper = {
    phoneNumber: (code: string, phone: string) => {
        const p1 = phone.substring(0, 3);
        const p2 = phone.substring(3, 6);
        const p3 = phone.substring(6, 10);

        return `(${code}) ${p1}-${p2}-${p3}`
    }
}