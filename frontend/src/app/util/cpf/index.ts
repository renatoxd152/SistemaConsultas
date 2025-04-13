export const formatarCPF = (value: any): string => {
    value = value.replace(/[^\d]/g, "");

    if (value.length !== 11) return value;

    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};
export const formatarRG = (value: any): string => {
    value = value.replace(/[^\d]/g, "");

    if (value.length !== 9) return value;

    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
};
