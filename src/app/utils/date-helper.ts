export class DateHelper {
    static getMaxDate(): Date {
        return new Date(new Date().getTime() + 86400000);
    }
    public static compararDataSemTempo(data1: Date, data2: Date, comparator: (d1: Date, d2: Date) => boolean) {
        const data1SemTempo = data1;
        const data2SemTempo = data2;
      
        data1SemTempo.setHours(0, 0, 0, 0);
        data2SemTempo.setHours(0, 0, 0, 0);
        return comparator(data1SemTempo, data2SemTempo);
      }
}
